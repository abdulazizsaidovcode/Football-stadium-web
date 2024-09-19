import { ApexOptions } from "apexcharts";

export const fakeChartData: {
	series: { name: string; data: number[] }[];
	options: ApexOptions;
} = {
	series: [
		{
			name: "Schools",
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
		},
		{
			name: "University",
			data: [10, 60, 20, 10, 49, 62, 150, 91, 148],
		},
	],
	options: {
		chart: {
			toolbar: {
				show: false,
			},
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
