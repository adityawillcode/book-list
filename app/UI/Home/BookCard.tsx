'use client'
import React,{useEffect, useState} from 'react'
import { Card } from 'react-bootstrap'

function BookCard({book,getImageUrl}:{book:any,getImageUrl:any}) {
    const [imageURL,setImageURL]=useState('')

    useEffect(()=>{
        getImageUrl(book.coverImage).then((url:string)=>{setImageURL(url)})
    },[])
  return (
    <Card className='px-3 py-2'>
        <Card.Img className='h-[8rem] object-contain' src={`${imageURL}`} />
        <Card.Body>
    <Card.Title>this is book name: {book.bookName}</Card.Title>
    <Card.Text>
       Author- {book.author}
    </Card.Text>
    <Card.Text>
       price- {book.price}
    </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default BookCard