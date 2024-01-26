'use client'
import { useFirebase } from '@/app/context/firebaseProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function SigninForm() {
const router=useRouter()
const {user,loginWithEmailAndPassword,signinWithGoogle}=useFirebase()
const [inputData,setInputData]=useState({email:'',password:''})

const handleLogin=(e:any)=>{
e.preventDefault()
loginWithEmailAndPassword(inputData.email,inputData.password)
}

useEffect(()=>{
  if(user){
    router.push('/home')
  }else{
    router.push('/authentication/login')
  }
},[user])

    return (
        <Form className='w-[30rem]'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control  onChange={(e)=>{setInputData({...inputData,email:e.target.value})}}   type="email" placeholder="Enter email" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control  onChange={(e)=>{setInputData({...inputData,password:e.target.value})}}   type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className='flex flex-col gap-2'>
            <div className='flex gap-5'>
            <Button onClick={handleLogin} variant="primary" type="submit">
                submit
            </Button>
            <Button variant="primary" onClick={()=>{router.push('/authentication/signup')}}>
                Signup
            </Button>
            </div>
            <Button variant='danger' onClick={signinWithGoogle}>Google</Button>
            </Form.Group>
        </Form>
    )
}

export default SigninForm