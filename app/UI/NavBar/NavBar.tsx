'use client'
import { useFirebase } from "@/app/context/firebaseProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar() {
    const router = useRouter()
    const { user, logOut,firebaseAuth } = useFirebase()
    
    

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <div className=" px-3 w-[10rem] h-6 text-white">
                {user?.email}
            </div>
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/" >Home</Nav.Link>
                    <Nav.Link href="/listing">Listing</Nav.Link>
                    <Nav.Link onClick={logOut} >Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar