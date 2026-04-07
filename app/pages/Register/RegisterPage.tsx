import AuthForm from "components/ui/AuthForm";
import FloatingLabel from "components/ui/FloatingLabel";
import { CheckCircle, InfoCircle } from "iconoir-react";
import { useDeferredValue, useEffect, useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router";
import { authApi } from "services/modules/authApi";
import { setLoading } from "store/module/ModuleSlice";
import Swal from "sweetalert2";
import type {
  RegisterFormDataTypes,
  RegisterFormErrorsTypes,
} from "types/globalTypes";
import { checkPasswordStrength } from "utils/utilities";
import { validateEmail } from "utils/validations";
interface PasswordStatuses<T> {
  length: T;
  upper: T;
  lower: T;
  symbol: T;
  digit: T;
}
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
  const [errors, setErrors] = useState<RegisterFormErrorsTypes>({
    name: [],
    email: [],
    username: [],
    password: [],
    confirmPassword: [],
  });
  const deferredHasError = useDeferredValue(isPasswordMatch);
  const deferredEmailError = useDeferredValue(isEmailValid);
  const authState = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordStatus, setPasswordStatus] = useState<
    PasswordStatuses<boolean>
  >({
    length: false,
    upper: false,
    lower: false,
    symbol: false,
    digit: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePasswordStatus = (
    name: keyof PasswordStatuses<boolean>,
    value: boolean,
  ) => {
    setPasswordStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    Swal.fire({
      title: "Are you sure you want to proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!isPasswordMatch && !canSubmit) return false;
        try {
          dispatch(setLoading(true));
          const response = await authApi.register(formData).then((response) => {
            if (response) {
              dispatch(setLoading(false));
              Swal.fire({
                title: "Do you want to proceed to login?",
                icon: "question",
                showCancelButton: true,
                cancelButtonText: "No",
                confirmButtonText: "Yes",
              }).then((res) => {
                if (res.isConfirmed) {
                  dispatch(setLoading(true));
                  const login = authApi.login({
                    username: response?.username,
                    password: response?.password,
                  });
                  login.then(() => {
                    dispatch({ type: "auth/loginSuccess", payload: response });
                    dispatch(setLoading(false));
                  });
                } else if (res.isDismissed) {
                  dispatch(setLoading(false));
                  return navigate("/");
                }
              });
            }
          });
        } catch (err) {
          const errorResponse = await err?.errors;
          setErrors((prev) => ({
            ...prev,
            ...errorResponse,
          }));
          Swal.fire({
            title: errorResponse ?? err.message ?? "Error occured.",
            icon: "error",
            timer: 2000,
          });
          dispatch(setLoading(false));
        }
      }
    });
  };
  useEffect(() => {
    if (formData.email.trim() !== "") {
      setIsEmailValid(validateEmail(formData.email));
    }

    setIsPasswordMatch(formData.password === formData.confirmPassword);
    if (formData.password.trim() !== "") {
      const status = checkPasswordStrength(formData.password);
      setPasswordStatus((prev) => ({
        ...prev,
        lower: status >= 1,
        upper: status >= 2,
        digit: status >= 3,
        symbol: status == 4,
        length: formData.password.trim().length >= 8,
      }));
      setIsPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData]);
  useEffect(() => {
    const isPasswordValid = Object.values(passwordStatus).every(
      (val) => val !== false,
    );
    if (isPasswordValid) {
      if (
        formData.name.trim() !== "" &&
        formData.username.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== "" &&
        isPasswordMatch &&
        isEmailValid &&
        isPasswordValid
      ) {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    } else setCanSubmit(false);
  }, [passwordStatus, isPasswordMatch, isEmailValid]);
  return (
    <AuthForm title="Register">
      <h3 className="text-center text-sm font-thin mb-4">
        to create a new account
      </h3>
      <FloatingLabel
        currentValue={formData.name}
        label="Full Name"
        customClassName="mb-3"
        inputName="name"
        setInputValue={(e) => handleInputChange(e)}
        hasError={!!errors.name}
        errors={errors.name}
      />
      <FloatingLabel
        currentValue={formData.email}
        label="Email"
        customClassName="mb-3"
        inputName="email"
        setInputValue={(e) => handleInputChange(e)}
        hasError={!!errors.email}
        errors={errors.email}
      />
      {!deferredEmailError && (
        <span className="text-red-500 text-sm mb-2">Invalid email address</span>
      )}
      <FloatingLabel
        currentValue={formData.username}
        label="Username"
        customClassName="mb-3"
        inputName="username"
        setInputValue={(e) => handleInputChange(e)}
        hasError={!!errors.username}
        errors={errors.username}
      />
      <FloatingLabel
        currentValue={formData.password}
        attr={{ maxLength: 10 }}
        label="Password"
        isPassword={true}
        customClassName="mb-3"
        inputName="password"
        setInputValue={(e) => handleInputChange(e)}
        hasError={!!errors.password}
        errors={errors.password}
      />

      <FloatingLabel
        currentValue={formData.confirmPassword}
        attr={{ maxLength: 10 }}
        label="Confirm Password"
        isPassword={true}
        customClassName="mb-3"
        inputName="confirmPassword"
        setInputValue={(e) => handleInputChange(e)}
        hasError={!!errors.confirmPassword}
        errors={errors.confirmPassword}
      />

      {!deferredHasError && (
        <span className="text-red-500 text-sm mb-2">
          Passwords do not match
        </span>
      )}

      <br />
      <ul className="flex flex-col gap-2">
        <li
          className={`flex gap-2 text-sm ${passwordStatus.length ? "text-red-500" : "text-black"} transition-colors `}
        >
          {passwordStatus.length ? <CheckCircle /> : <InfoCircle />}
          <span>At least 8 characters length</span>
        </li>
        <li
          className={`flex gap-2 text-sm ${passwordStatus.digit ? "text-red-500" : "text-black"} transition-colors`}
        >
          {passwordStatus.digit ? <CheckCircle /> : <InfoCircle />}
          <span>At least 1 number (0 - 9)</span>
        </li>
        <li
          className={`flex gap-2 text-sm ${passwordStatus.lower ? "text-red-500" : "text-black"} transition-colors `}
        >
          {passwordStatus.lower ? <CheckCircle /> : <InfoCircle />}
          <span>At least 1 lowercase letter (a-z)</span>
        </li>
        <li
          className={`flex gap-2 text-sm ${passwordStatus.symbol ? "text-red-500" : "text-black"} transition-colors `}
        >
          {passwordStatus.symbol ? <CheckCircle /> : <InfoCircle />}
          <span>At least 1 special symbol (!-$)</span>
        </li>
        <li
          className={`flex gap-2 text-sm ${passwordStatus.upper ? "text-red-500" : "text-black"}  transition-colors`}
        >
          {passwordStatus.upper ? <CheckCircle /> : <InfoCircle />}
          <span>At least 1 uppercase letter (A-Z)</span>
        </li>
      </ul>
      <button
        type="button"
        className={`p-1 mt-4 mb-4 cursor-pointer bg-blue-600 text-white font-bold ${!canSubmit ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
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
