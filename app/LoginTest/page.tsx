import React from 'react'
import LoginForm from './LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export default async function LoginTest() {
  const session = await getServerSession()
  if(session){
    redirect('/dashboard')
  }
  console.log(session)
  return (
      <LoginForm/>
  )
}

// LoginPagee.guestGuard = true

// export default LoginTest