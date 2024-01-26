'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';
import {useFirebase} from '@/app/context/firebaseProvider'
function SignupForm() {
const router=useRouter()
const [inputData,setInputData]=useState({email:'',password:''})
const {signupUserWithEmailAndPassword,signinWithGoogle,user}=useFirebase()
useEffect(()=>{
  if(user){
    router.push('/home')
  }
},[user])

const handleCreateAccount =async (e:any) =>{
    e.preventDefault();
  await  signupUserWithEmailAndPassword(inputData.email,inputData.password)
}

const handleGoogleAuth =async () =>{
  signinWithGoogle()
}

  return (
    <Form className='w-[30rem]' >
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>{setInputData({...inputData,email:e.target.value})}} type="email" placeholder="Enter email" />

    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  onChange={(e)=>{setInputData({...inputData,password:e.target.value})}}  type="password" placeholder="Password" />
    </Form.Group>

    <Form.Group className='w-full flex flex-col gap-2'>
   <div className=' flex justify-between gap-3'>
   <Button variant="primary"  onClick={handleCreateAccount}>
        Create Account
    </Button>
    <Button variant="primary" onClick={()=>{router.push('/authentication/login')}}>
                signin
            </Button>
   </div>
    <Button variant="danger"  onClick={handleGoogleAuth}>
        Continue with google
    </Button>
    </Form.Group>
</Form>
  )
}

export default SignupForm