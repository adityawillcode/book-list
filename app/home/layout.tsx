import React from 'react'
import FirebaseProvider from '../context/firebaseProvider'
import NavBar from '../UI/NavBar/NavBar'
function layout({children}:{children:any}) {
  return (
    <div>
        <FirebaseProvider>
        <NavBar />
        {children}
        </FirebaseProvider>
        </div>
  )
}

export default layout