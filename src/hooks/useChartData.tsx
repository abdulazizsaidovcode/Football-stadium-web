import { useCallback, useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";

type OrdersData = {
	series: { name: string; data: number[] }[];
	options: ApexOptions;
};

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const chartConfig: ApexOptions = {
	chart: {
		toolbar: {
			show: false,
		},
		height: 350,
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

	grid: {
		row: {
			colors: ["#f3f3f3", "transparent"],
			opacity: 0.5,
		},
	},
	xaxis: {
		
		categories: months,
	},
};

export type StatisticData = {
	orderCount?: number;
	month: string;
	totalPrice?: number;
	clientCount?: number;
};

export const useChartData = (data: StatisticData[] | undefined) => {
	const createChartData = useCallback(
		(
			seriesName: string,
			dataKey: keyof StatisticData,
			chartId: string,
			yAxisTitle: string,
		): OrdersData => {
			const dataMap: { [key: string]: number } = {};

			data?.forEach((item) => {
				const value = item[dataKey];
				if (value !== undefined) {
					dataMap[item.month] = Number(value);
				}
			});

			const seriesData = months.map((month) => dataMap[month] || 0);

			return {
				series: [{ name: seriesName, data: seriesData }],
				options: {
					chart: { id: chartId },
					yaxis: { title: { text: yAxisTitle } },
				},
			};
		},
		[data],
	);

	const [orderCountData, setOrderCountData] = useState<OrdersData>({
		series: [],
		options: {},
	});
	const [totalPriceData, setTotalPriceData] = useState<OrdersData>({
		series: [],
		options: {},
	});
	const [clientData, setClientData] = useState<OrdersData>({
		series: [],
		options: {},
	});

	useEffect(() => {
		if (data) {
			setOrderCountData(
				createChartData("Orders", "orderCount", "orders-line", "Order Count"),
			);
			setTotalPriceData(
				createChartData(
					"Total Price",
					"totalPrice",
					"total-price-line",
					"Total Price",
				),
			);
			setClientData(
				createChartData(
					"Client Count",
					"clientCount",
					"client-count-line",
					"Client Count",
				),
			);
		} else {
			setOrderCountData({
				series: [],
				options: {},
			});
			setTotalPriceData({
				series: [],
				options: {},
			});
			setClientData({
				series: [],
				options: {},
			});
		}
	}, [data, createChartData]);

	return { orderCountData, totalPriceData, clientData };
};
