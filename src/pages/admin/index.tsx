import { Route, Routes } from "react-router-dom"; // Only import from 'react-router-dom'
import { Dashboard } from "./dashboard";
import Notification from "./notification";
import { SidebarComponent } from "../../components/ui/sidebar-component";
import Clients from "./clients";
import Masters from "./masters";
import NotMasters from "./not_masters";

function AdminPage() {
	return (
		<div className="w-full">
			<SidebarComponent>
				<Routes>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="notification" element={<Notification />} /> 
					<Route path="clients" element={<Clients />} />
					<Route path="masters" element={<Masters/>}/> 
					<Route path="not_masters" element={<NotMasters/>}/>
				</Routes>
			</SidebarComponent>
		</div>
	);
}

export default AdminPage;
