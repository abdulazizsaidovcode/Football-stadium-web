import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { fakeChartData } from "../../constants/mock-data";
import { Input } from "../ui/input";
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
					<Chart
						options={chartData.options}
						series={chartData.series}
						type={type}
						height={250}
					/>
				</div>
			))}
			<div>
				<div>
					<Input
						type="month"
						onChange={(e) => {
							console.log(e.target.value);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ApexChart;
