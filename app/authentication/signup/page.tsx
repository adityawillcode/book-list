import React from 'react'
import SignupForm from '@/app/UI/authenticationUI/SignupForm'
function page() {
  return (
    <div className=' border border-1  flex flex-col justify-center items-center h-screen'>
      <h4>Signup</h4>
        <SignupForm />
    </div>
  )
}

export default page