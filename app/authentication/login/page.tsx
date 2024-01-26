import SigninForm from "@/app/UI/authenticationUI/signinForm"

function page() {
    return (
        <div className='container h-screen flex  flex-col gap-4 justify-center items-center'>
            <h4>Login</h4>
            <SigninForm/>
        </div>
    )
}

export default page