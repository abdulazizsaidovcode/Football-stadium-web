import { Route, Routes } from "react-router";
import Webpage from "./pages/web";
import Navbar from "./components/custom/Navbar";
import { SignIn } from "./pages/Auth/SignIn";

function App() {
	return (
		<div className="bg-gray-100 min-h-screen">
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<Webpage />}
				/>
				<Route
					path="signin"
					element={<SignIn />}
				/>
			</Routes>
		</div>
	);
}

export default App;
