import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/custom/Navbar";
import { SignIn } from "./pages/auth/SignIn";
import AdminPage from "./pages/admin";
import Webpage from "./pages/web";
import ProtectedRoute from "./components/custom/private-route";

function App() {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<div className="bg-gray-100 min-h-screen">
			{pathname === "/" ? <Navbar /> : null}
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/" element={<Webpage />} />
				<Route path="/admin/*" element={
						<ProtectedRoute>
							<AdminPage />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<Navigate to="*" replace />} />
			</Routes>
		</div>
	);
}

export default App;
