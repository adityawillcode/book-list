'use client'
import React, { useEffect } from 'react'
import { useFirebase } from '../context/firebaseProvider'
import { useRouter } from 'next/navigation'

function page({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { user } = useFirebase()
    useEffect(() => {

        if (user) {
            router.push('/home')
        }
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default page