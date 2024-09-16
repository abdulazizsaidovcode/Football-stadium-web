import { Route, Routes, useLocation } from "react-router-dom";
import Webpage from "./pages/web";
import Navbar from "./components/custom/Navbar";
import { SignIn } from "./pages/Auth/SignIn";
import AdminPage from "./pages/admin";
import { Dashboard } from "./pages/admin/dashboard";
import { SidebarComponent } from "./components/ui/sidebar-component";
import Notification from "./pages/admin/notification";

function App() {
	const location = useLocation();
	const isAdminRoute = location.pathname.startsWith("/admin");

	return (
		<div className="bg-gray-100 min-h-screen">
			{!isAdminRoute && <Navbar />}

			<Routes>
				<Route path="/" element={<Webpage />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/admin" element={<AdminPage />} />
				<Route
					path="/admin/dashboard"
					element={
						<SidebarComponent title="Dashboard">
							<Dashboard />
						</SidebarComponent>
					}
				/>
				<Route
					path="/admin/notification"
					element={
						<SidebarComponent title="Notification">
							<Notification />
						</SidebarComponent>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
