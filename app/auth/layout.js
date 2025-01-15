//@ts-nocheck

import { SessionProvider } from "next-auth/react";

export default function AuthLayout({
  Component,
  pageProps: { session, ...pageProps },

}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
