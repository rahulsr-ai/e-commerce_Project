import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { dbConnect } from "./lib/db";
import User from "./models/UserSchema";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        // url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "consent", // Ensures the consent screen is always displayed
          access_type: "offline", // Allows getting a refresh token
          response_type: "code", 
          // scope: "openid email profile", // Scopes you want to request
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      }, // credentials end point

      authorize: async (credentials) => {
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Please fill all the fields");
        }

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error(" user not found");
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        // Return user data to be stored in the session
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          authProviderId: user.authProviderId,
          cart: user.cart,
          orders: user.orders,
        };
      }, // authorize end point
    }),
  ], // providers end point

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  }, // callback end point

  // async signIn({ user, account }) {
  //   if (account?.provider === "google") {
  //     try {
  //       const { email, name, image, id } = user;
  //       await dbConnect();
  //       const alreadyUser = await User.findOne({ email });

  //       if (!alreadyUser) {
  //         await User.create({ email, name, image, authProviderId: id });
  //       } else {
  //         return true;
  //       }
  //     } catch (error) {
  //       throw new Error("Error while creating user");
  //     }
  //   }

  //   if (account?.provider === "credentials") {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }, // signIn end point
});
