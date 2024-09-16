import { useEffect } from "react";
import Cookies from "js-cookie";
import { useStore } from "../context/store";
import { useNavigate } from "react-router";

export const useAuth = () => {
	const { isAuth, setAuth } = useStore();
	const navigate = useNavigate();
	useEffect(() => {
		const token = Cookies.get("auth_token");
		const checkAuth = async () => {
			try {
				if (token) {
					navigate("/admin/dashboard");
					const userAuthenticated = true;
					setAuth(userAuthenticated);
					console.log(token);
					
				} else {
					setAuth(false);
				}
			} catch (error) {
				console.error("Error during authentication:", error);
				setAuth(false);
			}
		};
		checkAuth();
		return () => {};
	}, [setAuth]);

	return { isAuth };
};
