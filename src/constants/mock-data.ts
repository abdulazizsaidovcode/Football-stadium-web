import { ApexOptions } from "apexcharts";

export const fakeChartData: {
	series: { name: string; data: number[] }[];
	options: ApexOptions;
} = {
	series: [
		{
			name: "Desktops",
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
		},
	],
	options: {
		chart: {
			type: "line",
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
		},
		title: {
			text: "Product Trends by Month",
			align: "left",
		},
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"],
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
			],
		},
	},
};
