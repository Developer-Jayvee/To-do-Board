import { Clock, Folder, GoogleDocs, Hashtag, KanbanBoard } from "iconoir-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  customClass?: string;
}
export default function Sidebar({ customClass = "" }: SidebarProps) {
  const location = useLocation();
  const activeLink = "bg-gray-200 text-blue-700 font-semibold ";
  return (
    <aside
      className={`sidebar fixed w-[250px] left-0 top-0 bottom-0 flex flex-col items-center-safe py-2 ${customClass}`}
    >
      <div className="sidebar-header flex gap-2 items-center mb-2 ">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg"
          className="w-[60px] h-10"
        />
        <p className="text-2xl font-semibold">To Do Board</p>
      </div>
      <div className="border-b border-gray-200 w-[90%] mb-2"></div>
      <nav className="sidebar-nav mt-2 w-full">
        <ul className="w-full">
          <li className="w-full">
            <p className="text-left w-full pl-2 font-semibold">General</p>
            <ul>
              <li
                className={`w-full ${location.pathname === "/board" ? activeLink : ""} py-2`}
              >
                <Link
                  to="/board"
                  className="px-[20px] text-md flex items-center w-full "
                >
                  <KanbanBoard className=" mr-2" />
                  <span className="align-middle">Board</span>
                </Link>
              </li>
              <li
                className={`w-full ${location.pathname === "/history" ? activeLink : ""} py-2`}
              >
                <Link
                  to="/history"
                  className="px-[20px] text-md flex items-center w-full "
                >
                  <Clock className=" mr-2" />
                  <span className="align-middle">History / Activity</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="w-full mt-2">
            <p className="text-left w-full pl-2 font-semibold">Management</p>
            <ul>
              <li
                className={`w-full ${location.pathname === "/" ? activeLink : ""} py-2`}
              >
                <Link
                  to="/history"
                  className="px-[20px] text-md flex items-center w-full "
                >
                  <Folder className=" mr-2" />
                  <span className="align-middle">Categories</span>
                </Link>
              </li>
                <li
                className={`w-full ${location.pathname === "/" ? activeLink : ""} py-2`}
              >
                <Link
                  to="/history"
                  className="px-[20px] text-md flex items-center w-full "
                >
                  <Hashtag className=" mr-2" />
                  <span className="align-middle">Labels</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
