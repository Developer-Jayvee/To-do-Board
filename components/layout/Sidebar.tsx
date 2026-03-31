import { Clock, GoogleDocs, KanbanBoard } from "iconoir-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  customClass?: string;
}
export default function Sidebar({ customClass = "" }: SidebarProps) {
    const location = useLocation();
    const activeLink = "bg-gray-200 text-blue-700 font-semibold ";
  return (
    <aside className={`sidebar fixed w-[250px] left-0 top-0 bottom-0 flex flex-col items-center-safe py-2 ${customClass}`}>
      <div className="sidebar-header flex gap-2 items-center mb-2 ">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" 
            className="w-[60px] h-10"
        />
        <p className="text-2xl font-semibold">To Do Board</p>
      </div>
      <div className="border-b border-gray-200 w-[90%] mb-2"></div>
      <p className="text-left w-full pl-2 font-semibold">General</p>
      <nav className="sidebar-nav mt-2 w-full">
        <ul className="w-full">
          <li className={`w-full ${location.pathname === "/board" ? activeLink : ""} py-3`}>
            <Link to="/board" className="px-2 text-lg ">
                <KanbanBoard  className="inline-block mr-2"/>
                <span className="align-middle">Board</span>
            </Link>
          </li>
          <li className={`w-full ${location.pathname === "/history" ? activeLink : ""} py-3`}>
            <Link to="/history" className="px-2  ">
                <Clock  className="inline-block mr-2"/>
                <span className="align-middle">History</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
