import { Navigate } from "react-router";
import { getData } from "../utils/shared";
import type { JSX } from "react";

const ProtectedRoute = function ({children}: {children: JSX.Element}) {
   const user = getData("currUser");
   if (!user) return <Navigate to="/login" replace />;
   return children;
}

export default ProtectedRoute;