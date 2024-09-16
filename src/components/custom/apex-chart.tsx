import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { fakeChartData } from "../../mock/mock-data";

interface ChartData {
	series: { name: string; data: number[] }[];
	options: ApexOptions;
}

const ApexChart: React.FC = () => {
	const [chartData] = useState<ChartData>(fakeChartData);

	const chartTypes: ("line" | "area" | "bar")[] = ["line", "area", "bar"];

	return (
		<div className="w-full mx-auto flex flex-wrap justify-between max-1060:justify-center">
			{chartTypes.map((type) => (
				<div
					key={type}
					className="border-4 w-[30%] max-1060:m-4 max-650:w-[95%] max-1060:w-[45%] max-650:block border-black p-4 rounded-xl">
					<ReactApexChart
						options={chartData.options}
						series={chartData.series}
						type={type}
						height={250}
					/>
				</div>
			))}
		</div>
	);
};

export default ApexChart;
