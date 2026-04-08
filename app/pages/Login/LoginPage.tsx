import { Eye } from "iconoir-react";
import "./login.css";
import FloatingLabel from "components/ui/FloatingLabel";
import Button from "components/ui/Button";
import AuthForm from "components/ui/AuthForm";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { authApi } from "services/modules/authApi";
import type { LoginFormData } from "types/globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "store";
import { Link, redirect } from "react-router";
import Swal from "sweetalert2";
import { setLoading } from "store/module/ModuleSlice";

const LoginPage = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [canLogin, setCanLogin] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  useEffect(() => {
    setCanLogin(
      formData.username.trim() !== "" && formData.password.trim() !== "",
    );
  }, [formData]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const self = e.currentTarget;
    Swal.fire({
      title:"Proceed to login?",
      icon:"question",
      showCancelButton:true,
      confirmButtonText:"Proceed"
    })
    .then(async (result) => {
      if(result.isConfirmed){
        dispatch(setLoading(true));
        const formData = new FormData(self);
        const response = await authApi.login({
          username: formData.get("username") as string,
          password: formData.get("password") as string,
        }).then( (result) => {
          dispatch(setLoading(false));
          dispatch({ type: "auth/loginSuccess", payload: result });
        }).catch( (error) => {
          dispatch(setLoading(false));
          Swal.fire({
            title:`${error.message ?? 'Error occured while saving'} `,
            icon:"warning",
            timer:2000
          })
           setFormData(( prev) => ({
            ...prev,
            username:"",
            password:""
           }))
        });
        

      }
    }).catch( (err) => dispatch(setLoading(false)))
  
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <AuthForm title="Sign In">
      <form className=" flex flex-col justify-center" onSubmit={handleSubmit}>
        <h3 className="text-center text-sm font-thin mb-4">
          to continue to your account
        </h3>
        <div className="mb-2">
          <FloatingLabel
            currentValue={formData.username}
            label="Username"
            inputName="username"
            setInputValue={(e) => handleInputChange(e)}
          />
        </div>
        <div className="mb-2">
          <FloatingLabel
            currentValue={formData.password}
            label="Password"
            inputName="password"
            isPassword={true}
            setInputValue={(e) => handleInputChange(e)}
          />
        </div>
        {loginError && (
          <p className="text-center text-red-500 text-sm mb-2">{loginError}</p>
        )}
        <button
          type="submit"
          className={`p-1 mt-4 mb-[70px] bg-blue-600 text-white font-bold ${!canLogin ? "opacity-50 bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700"}`}
          disabled={!canLogin}
        >
          SIGN IN
        </button>
      </form>
      <div className="relative">
        <span className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-white px-2">
          or
        </span>
        <hr className="mb-[30px]" />
      </div>
      {/* <Button className="shadow-xs shadow-gray-500 mb-[20px]">
        <span>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />
        </span>
        <span>Continue with Google</span>
      </Button> */}
      <div className="label--wrapper">
        <i>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700">
            Create account
          </Link>
        </i>
      </div>
    </AuthForm>
  );
};

export default LoginPage;
