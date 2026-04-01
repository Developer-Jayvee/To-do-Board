import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { TOKEN_NAME } from "src/constants";
import { type AppDispatch } from "store";
import {  isUserAuthenticated } from "store/auth/AuthSlice";

export default function GuestLayout() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect( () => {
    dispatch({ type : 'auth/checkIfAuthenticated'});
  },[dispatch])

  if (isAuthenticated === null) {
    return null;
  }
  
  return !isAuthenticated ? <Outlet /> : <Navigate to="/board" replace />;
}
