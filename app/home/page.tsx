'use client'
import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/firebaseProvider'
import BookCard from '../UI/Home/BookCard'

function page() {
const {getAllBooks,getImageUrl} =useFirebase()
const [bookList,setBookList]=useState<any[] | null>(null)

const fetchBooks =async ()=>{
    const books=await getAllBooks()
    
    if(books){
      console.log(books);
        setBookList(books)
    }
}

useEffect(()=>{
        fetchBooks()
},[])


  return (
    <div>
    <h3>All Books</h3>
    {bookList &&
     <div className='flex gap-7'>
     {
     
      bookList?.map((book:any)=>{

        return(
          <div>
            <BookCard book={book} getImageUrl={getImageUrl}/>
          </div>
        )
      })
      }
    </div>}
    </div>

  )
}

export default page