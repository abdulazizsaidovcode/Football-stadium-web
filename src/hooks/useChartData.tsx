import { useCallback, useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";

type OrdersData = {
	series: { name: string; data: number[] }[];
	options: ApexOptions;
};

const months = [
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

const chartsConfig: ApexOptions = {
	chart: {
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: false,
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
					...chartsConfig,
					chart: { id: chartId },
					yaxis: { title: { text: yAxisTitle } },
				},
			};
		},
		[data],
	);

	const [orderCountData, setOrderCountData] = useState<OrdersData>({
		series: [],
		options: {
			...chartsConfig,
			yaxis: { title: { text: "Order Count" } },
		},
	});
	const [totalPriceData, setTotalPriceData] = useState<OrdersData>({
		series: [],
		options: {
			...chartsConfig,
			yaxis: { title: { text: "Total Price" } },
		},
	});
	const [clientData, setClientData] = useState<OrdersData>({
		series: [],
		options: {
			...chartsConfig,
			yaxis: { title: { text: "Client Count" } },
		},
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
				options: {
					...chartsConfig,
					chart: { id: "orders-line" },
					yaxis: { title: { text: "Order Count" } },
				},
			});
			setTotalPriceData({
				series: [],
				options: {
					...chartsConfig,
					chart: { id: "total-price-line" },
					yaxis: { title: { text: "Total Price" } },
				},
			});
			setClientData({
				series: [],
				options: {
					...chartsConfig,
					chart: { id: "client-count-line" },
					yaxis: { title: { text: "Client Count" } },
				},
			});
		}
	}, [data, createChartData]);

	return { orderCountData, totalPriceData, clientData };
};
