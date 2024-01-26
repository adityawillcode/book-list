'use client'
import React, { Children } from 'react'
import FirebaseProvider, { useFirebase } from '../context/firebaseProvider'

function layout({children}:{children:React.ReactNode}) {

  return (
    <div className=''>
        <FirebaseProvider>
        {children}
        </FirebaseProvider>
    </div>
  )
}

export default layout