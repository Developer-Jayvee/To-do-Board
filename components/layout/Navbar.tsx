import { Bell, Mail, NavArrowDown, Search } from "iconoir-react";
import "../../src/styles/navbar.css";
import Notification from "components/ui/Notification";

interface NavbarProps {
    customClass?: string;
}

export default function Navbar(
    { customClass = "" }: NavbarProps
){

    return (
        <nav className={`navbar  fixed left-[250px] top-0 right-0 flex justify-between items-center gap-4 p-2 ${customClass}`}>
            <h1 className="flex-1 text-xl ">Board</h1>
            <div className="search-bar relative flex-2 ">
                <input type="text" className="outline-offset-0 border-2 w-full py-1 rounded-2xl"  placeholder="" />
                <Search className="search-icon absolute  left-2 top-1"/>
            </div>
            <div className="notification mx-2 ">
                <Notification hasNotif={true}>
                    <Mail className="mail-icon cursor-pointer "/>
                </Notification>
                 <Notification>
                     <Bell className="bell-icon cursor-pointer "/>
                </Notification>
               
            </div>
            <div className="user-profile flex items-center gap-2 justify-center  ">
                <img src="https://ui-avatars.com/api/?background=random" alt="profile image" className="profile-image rounded-full w-10 h-10" />
                <div className="user-info">
                    <p className="m-0 p-0 font-medium text-md">John Doe</p>
                    <p className="m-0 p-0 font-light text-xs">HR Manager</p>
                </div>
                <NavArrowDown className="arrow-down cursor-pointer"/>
            </div>
        </nav>
    );

}