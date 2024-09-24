import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
const instance: AxiosInstance = axios.create({
	baseURL: "http://164.92.165.18:8080/api/v1/",
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
	},
});

instance.interceptors.request.use((config) => {
	const token = Cookies.get("auth_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default instance;
