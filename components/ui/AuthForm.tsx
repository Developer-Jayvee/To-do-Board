import type { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
  title: string;
}
export default function AuthForm({ children, title }: AuthFormProps) {
  return (
    <div className=" container-fluid fixed h-full sm:w-full left-0 right-0 flex items-center justify-center bg-blue-200">
      <div className=" shadow-2xl rounded-lg login-wrapper flex flex-col justify-center bg-white p-[30px] w-full mx-4 sm:w-[350px] ">
        <div className="flex justify-center">
           <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg"
          className="w-[60px] h-10"
        />
        </div>
        <h2 className="text-center text-xl">{title}</h2>
        {children}
      </div>
    </div>
  );
}
