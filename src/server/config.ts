import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
const instance: AxiosInstance = axios.create({
	baseURL: "http://134.122.77.107:8085/api/v1/",
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
	},
});

instance.interceptors.request.use((config) => {
	const token = Cookies.get("auth_token");
	console.log("🚀 ~ instance.interceptors.request.use ~ token:", token);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default instance;
