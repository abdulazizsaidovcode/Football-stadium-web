import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
	redirectTo: string;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo }) => {
	const { isAuth } = useAuth();
	return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
