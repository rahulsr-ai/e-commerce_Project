import React from 'react'
import Signup from '../../components/PagesComponent/signup'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const SignUpPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Signup/>
    </div>
  )
}

export default SignUpPage