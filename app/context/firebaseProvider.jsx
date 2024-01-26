'use client'
import React,{ createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut,signInWithEmailAndPassword } from 'firebase/auth'
import {getFirestore, collection,addDoc, getDocs} from  'firebase/firestore'
import {getDownloadURL, getStorage , ref , uploadBytes} from  'firebase/storage'

const firebaseContext = createContext()
const googleProvider=new GoogleAuthProvider()
export const useFirebase = () => {
  return useContext(firebaseContext)
}


const firebaseConfig = {
  apiKey: "AIzaSyDREEJgCb-Am5g16USgzNZ1rNmLbXeppaE",
  authDomain: "book-shop-79589.firebaseapp.com",
  projectId: "book-shop-79589",
  storageBucket: "book-shop-79589.appspot.com",
  messagingSenderId: "848750689955",
  appId: "1:848750689955:web:84deab1be0135e6fa0c916"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app)
const firestore=getFirestore(app)
const storage=getStorage(app)


export const listNewBook =async (bookName,price,author,cover)=>{
 try {
  const imageRef=ref(storage,`uploads/images/${Date.now()}-${cover.name}`)
  const newImage=   await uploadBytes(imageRef,cover)
  const collectionRef=collection(firestore,'books')
  const newDoc= await addDoc(collectionRef,{
    bookName,author,price,coverImage:newImage.ref.fullPath
  })
  if(newDoc && newImage){
    return {message:'file uploaded sucessfully'}
  }else{
    return {errorMessage:'failed'}
  }
 } catch (error) {
  console.log(error);
 }
}




// this is functional component
function FirebaseProvider({ children }) {
  const [authError, setAuthError] = useState(null)
  const [user,setUser]=useState(null)


    // const signedInUser=firebaseAuth.currentUser
    // if(signedInUser){
    //   setUser(signedInUser)
    // }

    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
});


   

  const signupUserWithEmailAndPassword = async (email, password) => {
  


    try {
    const newUser=  await createUserWithEmailAndPassword(firebaseAuth, email, password)
    if(newUser){
      console.log(newUser);
    }
    }
    catch (error) {
      console.log(error);
      if (error.code == 'auth/email-already-in-user') {
        setAuthError({ errorType: 'email', message: 'User Already exists' })
      }
      if (error.code == 'auth/missing-email') {
        setAuthError({ errorType: 'email', message: 'Please Enter Email' })
      }
      if (error.code == 'auth/missing-password') {
        setAuthError({ errorType: 'password', message: 'enter password' })
      }
    }
  }
  const loginWithEmailAndPassword = async (email, password) => {
    console.log({email,password});
 
    try {
    const newUser=  await signInWithEmailAndPassword(firebaseAuth, email, password)
    if(newUser){
      console.log(newUser);
    }
    }
    catch (error) {
      console.log(error);
     
    }
  }
  const signinWithGoogle = async () => {

    try {
      signInWithPopup(firebaseAuth,googleProvider)
    }
    catch (error) {
      console.log(error);
      if (error.code == 'auth/email-already-in-user') {
        setAuthError({ errorType: 'email', message: 'User Already exists' })
      }
    }
  }

  const logOut=()=>{
    signOut(firebaseAuth).then((user)=>{
      console.log('sucessfully signed out',user);
    }).catch((err)=>{
      console.log('failed:',err);
    })
  }

  const getAllBooks=async ()=>{
    try {
      const collectionRef=collection(firestore,'books')
    const data=await getDocs(collectionRef)
if(data){
  const books=data.docs.map((bookData)=>{
    return bookData.data()
  })
  return books
}
    } catch (error) {
      console.log(error);
    }
  }

  const getImageUrl=async (path)=>{
    return getDownloadURL(ref(storage,path))
  }


  return (
    <firebaseContext.Provider value={{ signupUserWithEmailAndPassword, authError,signinWithGoogle ,user,logOut,loginWithEmailAndPassword , firebaseAuth,getAllBooks,getImageUrl}}>
      {children}
    </firebaseContext.Provider>
  )
}

export default FirebaseProvider