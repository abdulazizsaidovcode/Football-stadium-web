import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Input } from "@/components/ui/input";
import { useYearlyStatisticData } from "@/hooks/useYearlyStatisticData";
import { chartConfig, useChartData } from "@/hooks/useChartData";

const ApexChart: React.FC = () => {
	const [year, setYear] = useState(2024);
	const {
		isLoading: isOrderCountLoading,
		data: orderCountData,
		error: orderCountError,
	} = useYearlyStatisticData(year, "yearly-statistic");
	const {
		isLoading: isClientCountLoading,
		data: clientCountData,
		error: clientCountError,
	} = useYearlyStatisticData(year, "yearly-clientCount");

	const isLoading = isOrderCountLoading || isClientCountLoading;

	const { orderCountData: orderCountChartData, totalPriceData } = useChartData(
		orderCountData?.data,
	);
	const { clientData } = useChartData(clientCountData?.data);

	const hasOrderCountData =
		orderCountData?.data && orderCountData.data.length > 0;
	const hasClientCountData =
		clientCountData?.data && clientCountData.data.length > 0;

	return (
		<>
			<div className="flex justify-end items-center gap-2 mb-4">
				<div className="">Enter Year :</div>
				<Input
					contentEditable={false}
					type="year"
					value={year}
					onChange={(e) => setYear(Number(e.target.value))}
				/>
			</div>
			<div className="w-full mx-auto flex flex-wrap justify-between max-1060:justify-center">
				<div className="border-2 w-[30%] max-1060:m-4 max-650:w-[95%] max-1060:w-[45%] max-h-[250px] overflow-hidden max-650:block border-gray-100 p-4 rounded-xl">
					{isLoading ? (
						"Loading..."
					) : orderCountError ? (
						"Data Topilmadi"
					) : hasOrderCountData ? (
						<Chart
							options={{
								...chartConfig,
								title: {
									text: "Order Count",
									align: "left",
								},
							}}
							series={orderCountChartData.series}
							type="line"
							height={250}
						/>
					) : (
						"Data Topilmadi"
					)}
				</div>
				<div className="border-2 w-[30%] min-h-[200px] max-1060:m-4 max-650:w-[95%] max-1060:w-[45%] max-h-[250px] max-650:block border-gray-100 p-4 rounded-xl">
					{isLoading ? (
						"Loading..."
					) : totalPriceData.series[0]?.data.some((data) => data > 0) ? (
						<Chart
							options={{
								...chartConfig,
								title: {
									text: "Total Price",
									align: "left",
								},
							}}
							series={totalPriceData.series}
							type="line"
							height={250}
						/>
					) : (
						"Data Topilmadi"
					)}
				</div>
				<div className="border-2 w-[30%] max-1060:m-4 max-650:w-[95%] max-1060:w-[45%] max-h-[250px] max-650:block border-gray-100 p-4 rounded-xl">
					{isLoading ? (
						"Loading..."
					) : clientCountError ? (
						"Data Topilmadi"
					) : hasClientCountData ? (
						<Chart
							options={{
								...chartConfig,
								title: {
									text: "Client Count",
									align: "left",
								},
							}}
							series={clientData.series}
							type="line"
							height={250}
						/>
					) : (
						"Data Topilmadi"
					)}
				</div>
			</div>
		</>
	);
};

export default ApexChart;
