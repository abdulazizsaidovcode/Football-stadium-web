import { Route, Routes, useLocation } from "react-router-dom";
import Webpage from "./pages/web";
import Navbar from "./components/custom/Navbar";
import { SignIn } from "./pages/auth/SignIn";
import AdminPage from "./pages/admin";
import PrivateRoute from "./components/custom/private-route";

function App() {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<div className="bg-gray-100 min-h-screen">
			{pathname === "/" ? <Navbar /> : null}
			<Routes>
				<Route path="/" element={<Webpage />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/admin/*" element={<PrivateRoute redirectTo="/signin" />}>
					<Route path="*" element={<AdminPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
