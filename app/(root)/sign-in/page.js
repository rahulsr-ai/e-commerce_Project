import React from 'react'
import SignIn from './sign-in'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const SignInPage = async () => {

  const session = await auth();


  if (session?.user) {
    redirect("/");
  }

  return (
     <div>
      <SignIn/>
     </div>
  )
}

export default SignInPage