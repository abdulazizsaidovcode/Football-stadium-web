import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { SidebarComponent } from "../../components/custom/sidebar-component";
import Clients from "./clients";
import Masters from "./masters";
import NotFoundPage from "../not-found-page";
function AdminPage() {
	return (
		<div className="w-full">
			<SidebarComponent>
				<Routes>
					<Route
						path="dashboard"
						element={<Dashboard />}
					/>
					<Route
						path="clients"
						element={<Clients />}
					/>
					<Route
						path="masters"
						element={<Masters />}
					/>
					<Route
						path="*"
						element={<NotFoundPage />}
					/>
				</Routes>
			</SidebarComponent>
		</div>
	);
}

export default AdminPage;
