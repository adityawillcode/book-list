'use client'
import { listNewBook } from '@/app/context/firebaseProvider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
function ListingForm() {
const [formData,setFormData]=useState({bookName:'',price:0,author:'',cover:''})
const router=useRouter()
const handleSubmit=async (e:any)=>{
e.preventDefault()
const {bookName,price,author,cover}=formData
const uploadStatus=await listNewBook(bookName,price , author,cover )
if(uploadStatus?.message){
  router.push('/home')
}else{
  alert('some error in uploading the book')
}

}

  return (
    <Container className='flex h-screen justify-center items-center flex-col'>
<Form className='w-[30rem]' onSubmit={handleSubmit}>
<Form.Group className="mb-3">
        <Form.Label>Book Name</Form.Label>
        <Form.Control onChange={(e)=>{setFormData({...formData,bookName:e.target.value})}} placeholder=" Book Name"  />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Book Price</Form.Label>
        <Form.Control onChange={(e)=>{setFormData({...formData,price:Number(e.target.value)})}}  placeholder=" Book Price (in Rupees)"  />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control onChange={(e)=>{setFormData({...formData,author:e.target.value})}}  placeholder=" Book Author"  />
      </Form.Group>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Cover Image</Form.Label>
        <Form.Control onChange={(e:any)=>{setFormData({...formData,cover:e.target.files[0]})}} type="file" size="sm" />
      </Form.Group>
      <Button variant='primary' type='submit'  >Submit</Button>
</Form>
   
      
    </Container>
  )
}

export default ListingForm