import { useNavigate } from "react-router";

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-9xl font-bold text-gray-800">404</h1>
				<p className="text-2xl md:text-3xl font-medium text-gray-600 mt-2">
					Oops! Page not found
				</p>
				<p className="text-gray-500 mt-4">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<div
					onClick={() => {
						navigate(-1);
					}}
					className="mt-6 inline-block px-6 py-2 text-sm font-medium leading-6 text-white bg-blue-500 rounded-full shadow hover:bg-blue-600 transition duration-200 ease-in-out">
					Go back to Home
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
