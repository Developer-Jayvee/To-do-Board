import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import { Outlet } from "react-router";

export default function AuthLayout() {

  return (
    <> 
      <Sidebar customClass="  border-r border-gray-300  bg-white"/>
      <Navbar customClass="border-b border-gray-300 bg-white"/>
      <div className="main-content ml-[250px] pt-[80px] px-4 min-h-screen">
        <Outlet/>
      </div>
    </>
  )
}
