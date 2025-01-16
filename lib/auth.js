//@ts-nocheck

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const { auth, handlers, signIn, singOut } = NextAuth({
  providers: ["github"],
});
