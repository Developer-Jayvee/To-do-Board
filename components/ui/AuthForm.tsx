

interface AuthFormProps {
    children: React.ReactNode;
    title: string;
}
export default function AuthForm({
    children , title
}: AuthFormProps){

    return (
         <div className=" container-fluid h-full flex items-center justify-center bg-blue-200">
             <div className=" shadow-2xl rounded-lg login-wrapper flex flex-col justify-center bg-white p-[30px] w-[350px] "> 
                 <h2 className="text-center text-xl">{title}</h2>
                {children}
            </div>
        </div>
    )
}