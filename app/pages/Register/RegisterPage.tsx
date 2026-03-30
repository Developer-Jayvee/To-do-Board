import AuthForm from "components/ui/AuthForm";
import FloatingLabel from "components/ui/FloatingLabel";
import { useDeferredValue, useEffect, useState, type ChangeEvent } from "react";
import { Link, redirect } from "react-router";
import type { RegisterFormDataTypes } from "types/globalTypes";

const RegisterPage = () => {

    const [isPasswordMatch , setIsPasswordMatch] = useState(true);
    const [canSubmit , setCanSubmit] = useState(false);
    const [formData , setFormData ] = useState<RegisterFormDataTypes>({
        fullName : "",
        username : "",
        password : "",
        confirmPassword : ""
    });
    const deferredHasError = useDeferredValue(isPasswordMatch);

    const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name] : value
        }));
    }
    useEffect(() => {
        if(formData.password === "" || formData.confirmPassword === "") {
            setIsPasswordMatch(true);
        } else {
            setIsPasswordMatch(formData.password === formData.confirmPassword);
        }
    }, [formData.password  , formData.confirmPassword]);

    useEffect(() => {   
        const { fullName, username, password, confirmPassword } = formData;
        if(fullName && username && password && confirmPassword && isPasswordMatch){
            setCanSubmit(false);
        } else {
            setCanSubmit(true);
        }
    },[formData]);
    return (
        <AuthForm title="Register">
            <FloatingLabel  label="Full Name" customClassName="mb-3"  inputName="fullName" setInputValue={(e) => handleInputChange(e)} />
            <FloatingLabel label="Username"  customClassName="mb-3" inputName="username" setInputValue={(e) => handleInputChange(e)} />
            <FloatingLabel label="Password" isPassword={true}  customClassName="mb-3" inputName="password" setInputValue={(e) => handleInputChange(e)} />
            <FloatingLabel label="Confirm Password" isPassword={true}  customClassName="mb-3"  inputName="confirmPassword" setInputValue={(e) => handleInputChange(e)} />

            {!deferredHasError && <span className="text-red-500 text-sm mb-2">Passwords do not match</span>}

             <button type="button" className={`p-1 mt-4 mb-4 bg-blue-600 text-white font-bold ${canSubmit ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`} disabled={canSubmit}>REGISTER</button>

             <div className="label--wrapper">
                <i>Already have an account? <Link to="/" className="text-blue-700">Sign in</Link></i>
            </div>
        </AuthForm>
    )
}


export default RegisterPage;