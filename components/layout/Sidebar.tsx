import { ArrowRightCircle, Clock, Folder, GoogleDocs, Hashtag, KanbanBoard, Settings } from "iconoir-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  customClass?: string;
  // currentScreenWidth : number;
  isSideBarOpen: boolean;
}
export default function Sidebar({ customClass = ""  , isSideBarOpen}: SidebarProps) {

  useEffect(() => {
    console.log(isSideBarOpen);
    
  },[isSideBarOpen])
  const location = useLocation();
  const activeLink = "bg-gray-200 text-blue-700 font-semibold ";
  return (
    <aside
      className={`sidebar z-2 fixed w-20 overflow-hidden   md:w-[250px] transition-all left-0 top-0 bottom-0 flex flex-col items-center-safe py-2 ${customClass}`}
    >
      <div className="sidebar-header relative flex gap-2 items-center mb-2  ">
        
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg"
          className="w-[60px] h-10"
        />
        <p className="text-2xl font-semibold hidden md:inline-block">To Do Board</p>
      </div>
      <div className="border-b border-gray-200 w-[90%] mb-2"></div>
      <nav className="sidebar-nav mt-2 w-full">
        <ul className="w-full  ">
          <li className="w-full">
            <p className="text-left w-full pl-2 font-semibold hidden md:inline-block">General</p>
            <ul>
              <li
                className={`w-full ${location.pathname === "/board" ? activeLink : ""} py-2`}
              >
                <Link
                  title="Board"
                  to="/board"
                  className="px-[20px] text-md flex justify-center md:justify-start items-center w-full "
                >
                  <KanbanBoard className=" mr-2 " />
                  <span className="align-middle hidden md:inline-block">Board</span>
                </Link>
              </li>
              {/* <li
                className={`w-full ${location.pathname === "/history" ? activeLink : ""} py-2`}
              >
                <Link
                  title="History"
                  to="/history"
                  className="px-[20px] text-md flex justify-center md:justify-start items-center w-full "
                >
                  <Clock className=" mr-2" />
                  <span className="align-middle  hidden md:inline-block">History / Activity</span>
                </Link>
              </li> */}
            </ul>
          </li>
          <li className="w-full mt-2">
            <p className="text-left w-full pl-2 font-semibold  hidden md:inline-block">Management</p>
            <ul>
              <li
                className={`w-full ${location.pathname === "/configurations" ? activeLink : ""} py-2`}
              >
                <Link
                  title="Configurations"
                  to="/configurations"
                  className="px-[20px] text-md flex justify-center md:justify-start items-center w-full "
                >
                  <Settings className=" mr-2" />
                  <span className="align-middle  hidden md:inline-block">Configuration</span>
                </Link>
              </li>
             
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
