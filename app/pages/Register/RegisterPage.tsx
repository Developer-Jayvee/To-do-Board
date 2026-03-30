import AuthForm from "components/ui/AuthForm";
import FloatingLabel from "components/ui/FloatingLabel";
import { useDeferredValue, useEffect, useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect } from "react-router";
import { authApi } from "services/modules/authApi";
import type { RegisterFormDataTypes } from "types/globalTypes";
import { validateEmail } from "utils/validations";

const RegisterPage = () => {
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [formData, setFormData] = useState<RegisterFormDataTypes>({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const deferredHasError = useDeferredValue(isPasswordMatch);
  const deferredEmailError = useDeferredValue(isEmailValid);
  const authState = useSelector( (state: any) => state.auth);
  const dispatch = useDispatch();


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const action = confirm("Are you sure you want to register?");
    if (!action) return;
    
    if (!isPasswordMatch && !canSubmit) return false;
    const response = await authApi.register(formData);
    if(response){
        dispatch({ type: "auth/loginSuccess", payload: response });
    }
  };
  useEffect(() => {
    const { name, username, password, confirmPassword } = formData;
    if (
      name &&
      username &&
      password &&
      confirmPassword &&
      isPasswordMatch &&
      validateEmail(formData.email)
    ) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
    if(formData.email.trim() !== ""){
        setIsEmailValid( validateEmail(formData.email));
    }
    if(formData.password.trim() !== "" && formData.confirmPassword.trim() !== ""){
        setIsPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData]);
  return (
    <AuthForm title="Register">
      <FloatingLabel
        label="Full Name"
        customClassName="mb-3"
        inputName="name"
        setInputValue={(e) => handleInputChange(e)}
      />
      <FloatingLabel
        label="Email"
        customClassName="mb-3"
        inputName="email"
        setInputValue={(e) => handleInputChange(e)}
       
      />
      {!deferredEmailError && (
        <span className="text-red-500 text-sm mb-2">Invalid email address</span>
      )}
      <FloatingLabel
        label="Username"
        customClassName="mb-3"
        inputName="username"
        setInputValue={(e) => handleInputChange(e)}
      />
      <FloatingLabel
        attr={ {maxLength:10} }
        label="Password"
        isPassword={true}
        customClassName="mb-3"
        inputName="password"
        setInputValue={(e) => handleInputChange(e)}
      />
      <FloatingLabel
        attr={ {maxLength:10} }
        label="Confirm Password"
        isPassword={true}
        customClassName="mb-3"
        inputName="confirmPassword"
        setInputValue={(e) => handleInputChange(e)}
      />

      {!deferredHasError && (
        <span className="text-red-500 text-sm mb-2">
          Passwords do not match
        </span>
      )}

      <button
        type="button"
        className={`p-1 mt-4 mb-4 bg-blue-600 text-white font-bold ${!canSubmit ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        REGISTER
      </button>

      <div className="label--wrapper">
        <i>
          Already have an account?{" "}
          <Link to="/" className="text-blue-700">
            Sign in
          </Link>
        </i>
      </div>
    </AuthForm>
  );
};

export default RegisterPage;
