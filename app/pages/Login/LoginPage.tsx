import { Eye } from "iconoir-react";
import "./login.css"
import FloatingLabel from "components/ui/FloatingLabel";

const LoginPage = () => {
    return (
        <div className=" container-fluid h-full flex items-center justify-center bg-blue-200">
            <div className=" shadow-2xl rounded-lg login-wrapper flex flex-col justify-center bg-white p-[30px] w-[350px] ">
                <form className=" flex flex-col justify-center">
                    <h2 className="text-center text-xl">Sign in</h2>
                    <h3 className="text-center text-sm font-thin mb-4">to continue to your account</h3>
                    <div className="mb-2">
                        <FloatingLabel label="Username" />
                    </div>
                    <div className="mb-2">
                        <FloatingLabel label="Password" isPassword={true} />
                    </div>
                    <button type="button" className="p-1 mt-4 mb-[70px] bg-blue-600 text-white font-bold">SIGN IN</button>
                </form>
                <div className="relative">
                    <span className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-white px-2">or</span>
                    <hr className="mb-[30px]" />
                </div>

                <button type="button" className="btn-primary custom shadow-xs shadow-gray-500 mb-[20px]">
                    <span>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />
                    </span>
                    <span>
                        Continue with Google
                    </span>
                </button>

                <div className="label--wrapper">
                    <i>Don't have an account? <a href="#" className="text-blue-700">Create account</a></i>
                </div>
            </div>

        </div>
    )
}


export default LoginPage;