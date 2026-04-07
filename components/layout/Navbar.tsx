import { Bell, Mail, MenuScale, NavArrowDown, Search } from "iconoir-react";
import "../../src/styles/navbar.css";
import Notification from "components/ui/Notification";
import { useState, type Dispatch, type SetStateAction } from "react";
import { authApi } from "services/modules/authApi";
import Swal from "sweetalert2";
import { Navigate, redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "store/auth/AuthSlice";
import { type AppDispatch, type RootState } from "store";

interface NavbarProps {
    customClass?: string;
    moduleName : string | undefined;
    user : string | null;
    setSideBarOpen : Dispatch<SetStateAction<boolean>>;
    isSideBarOpen : boolean;
}

export default function Navbar(
    { customClass = "" , moduleName = "" , user , setSideBarOpen , isSideBarOpen}: NavbarProps
){
    const [isLogoutHidden ,setLogoutHidden] = useState<boolean>(true);
  
    const dispatch = useDispatch<AppDispatch>();
    const logout = async () => {
        Swal.fire({
            title:"Are you sure you want to logout?",
            icon:"question",
            showCancelButton:true,
            confirmButtonText:"Yes",
            cancelButtonText:"No"
        }).then( async (result) => {
            if(result.isConfirmed){
                dispatch(logoutUser())
                .unwrap()
                .then(() => {
                    return redirect("/");
                })
            }
            setLogoutHidden(true)
        })
    }
    
    return (
        <div className="relative">
            <nav className={`navbar left-20 fixed md:left-[250px]  transition-all top-0 right-0 flex justify-between items-center gap-4 p-2 ${customClass} `}>
                {/* <h1><MenuScale className="inline-block md:hidden cursor-pointer" onClick={() =>setSideBarOpen(!isSideBarOpen)}/></h1> */}
                <h1 className="flex-1 text-xl ">{moduleName}</h1>
                <div className="search-bar relative flex-2 ">
                    {/* <input type="text" className="outline-offset-0 border-2 w-full py-1 rounded-2xl"  placeholder="" />
                    <Search className="search-icon absolute  left-2 top-1"/> */}
                </div>
                <div className="notification mx-2 ">
                    {/* <Notification hasNotif={true}>
                        <Mail className="mail-icon cursor-pointer "/>
                    </Notification>
                    <Notification>
                        <Bell className="bell-icon cursor-pointer "/>
                    </Notification> */}
                
                </div>
                <div className="user-profile flex items-center gap-2 justify-center select-none  ">
                    <img src={`https://ui-avatars.com/api/?name=${user?.name}`} alt="profile image" className="profile-image rounded-full w-10 h-10" />
                    <div className="user-info cursor-pointer" onClick={() => setLogoutHidden(!isLogoutHidden)}>
                        <p className="m-0 p-0 font-medium text-md">{user?.name}</p>
                        <p className="m-0 p-0 font-light text-xs"></p>
                    </div>
                    <NavArrowDown className="arrow-down cursor-pointer" onClick={() => setLogoutHidden(!isLogoutHidden)}/>
                </div>
            </nav>
            <div className={`select-none absolute top-14 border border-gray-300 border-t-0 bg-white w-25 right-0 bg-white ${isLogoutHidden ? 'hidden' : ''}`}>
                <ul className="" >
                    <li className="text-center py-1 px-1 cursor-pointer hover:bg-gray-200 hover:font-medium hover:text-blue-700 " onClick={() => logout()}>
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    );

}