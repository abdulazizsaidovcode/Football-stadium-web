import { useQuery } from "@tanstack/react-query";
import instance from "../../server/config";

const AdminAccount = () => {
	const {
		data,
		isLoading,
	}: {
		data?: { firstName: string; lastName: string; phoneNumber: string };
		isLoading?: boolean;
	} = useQuery({
		queryKey: ["me"],
		queryFn: async () => {
			const response = await instance.get("user/me");
			return response.data.data;
		},
	});

	console.log(isLoading ? "Loading" : data);

	return (
		<div>
			<ul>
				<li className="my-4 mt-8 flex gap-5">
					<b>First Name: </b>
					<i>{isLoading ? "Loading..." : data?.firstName}</i>
				</li>
				<li className="my-4 flex gap-5">
					<b>Last Name: </b>
					<i>{isLoading ? "Loading..." : data?.lastName}</i>
				</li>
				<li className="my-4 flex gap-5">
					<b>Phone Number: </b>
					<i>{isLoading ? "Loading..." : data?.phoneNumber}</i>
				</li>
			</ul>
		</div>
	);
};

export default AdminAccount;
