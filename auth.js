import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import User from "./models/UserSchema";
import { dbConnect } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "select_account",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/sign-in", // Displays signin page
    signOut: "/",
    error: "/", // Error code passed in query string as ?error=
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("user is ------------------");
      console.log(user);
      if (user) {
        await dbConnect();

        const isUserExits = await User.findOne({ email: user.email });

        if (isUserExits?.status === "Blocked") {
          return null;
        }

        if (isUserExits) {
          return token;
        }

        const newUser = await User.create({
          name: user?.name,
          email: user?.email,
          role: "user",
          isVerified: true,
          authProvider: "google",
          authProviderId: user?.id,
          image: user?.image,
        });

        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  }, // callbacks end here
});
