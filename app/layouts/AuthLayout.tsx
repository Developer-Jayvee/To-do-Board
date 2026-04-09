import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";

import { createContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useParams } from "react-router";

import { toast, ToastContainer } from "react-toastify";
import { Routes } from "src/constants/routePaths";
import type { AppDispatch, RootState } from "store";
import { isUserAuthenticated, turnOffNotif } from "store/auth/AuthSlice";
import { notif } from "utils/toast.util";

export default function AuthLayout() {
  const location = useLocation();
  const routeDetails = Object.values(Routes).find( (val ) => val.url === location.pathname);
  const isAuthenticated = useSelector(isUserAuthenticated);
  const auth = useSelector((state : RootState) => state.auth);
  const [isSideBarOpen ,setSideBarOpen] = useState<boolean>(false);
  const [windowWidth , setWindowWidth] = useState<number | null>(null);
  const [isLoading ,setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  
  useEffect(() => {
    const checkAuth = async () => {
        return dispatch({ type: "auth/checkIfAuthenticated" });
    }
    checkAuth()
    
  }, [dispatch]);

    

  useEffect( () => {
    
    setLoading(false)
    if(typeof window !== undefined){
      setWindowWidth(window.innerWidth)
    }
   const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
   }
    window.addEventListener('resize',handleWindowWidth)
  },[])


  if(windowWidth === null || isLoading ){
    return <div className="flex justify-center items-center h-full"></div>
  }
   if(!isAuthenticated){
    return <Navigate to="/" replace />
  }

  
  
  return (
    <>
      <Sidebar customClass="  border-r border-gray-300  bg-white" isSideBarOpen={isSideBarOpen} />
      <Navbar customClass="border-b border-gray-300 bg-white" setSideBarOpen={setSideBarOpen} isSideBarOpen={isSideBarOpen} moduleName={routeDetails?.name} user={auth.userInfo} />
      <div className="ml-20   md:ml-[250px] pt-[80px] transition-all px-4 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
