import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { TOKEN_NAME } from "src/constants";

export default function GuestLayout() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  
  if (isAuthenticated === null) {
    return null;
  }
  
  return !isAuthenticated ? <Outlet /> : <Navigate to="/board" replace />;
}
