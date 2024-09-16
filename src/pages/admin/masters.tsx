import { useGetData } from "../../hooks/useGetData";

const Masters = () => {
	const { data, isLoading } = useGetData("user/not/confirmed/master/list");
	console.log("🚀 ~ Clients ~ data:", isLoading ? "Loading" : data);
	return <div>Masters</div>;
};

export default Masters;
