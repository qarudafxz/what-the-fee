import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { Button } from "@chakra-ui/react";

const MonthlyTraction = () => {
	const [active, setActive] = useState<number>(0);
	const chartRef = useRef(null);

	useEffect(() => {
		const data = [
			{ date: "May 20, 2023", count: 2 },
			{ date: "May 21, 2023", count: 10 },
			{ date: "May 22, 2023", count: 7.8 },
			{ date: "May 23, 2023", count: 23 },
			{ date: "May 24, 2023", count: 12 },
			{ date: "May 25, 2023", count: 5 },
			{ date: "May 26, 2023", count: 12 },
		];

		const labels = data.map((row) => row.date);
		const counts = data.map((row) => row.count);

		if (chartRef.current) {
			chartRef.current.destroy();
		}

		chartRef.current = new Chart(document.getElementById("monthly-traction"), {
			type: "line",
			data: {
				labels: labels,
				datasets: [
					{
						label: "",
						data: counts,
						borderColor: "#59D896",
						//gradient
						backgroundColor: "rgba(89, 216, 150, 0.2)",
						pointBackgroundColor: "#59D896",
						pointBorderColor: "#fff",
						pointHoverRadius: 6,
						pointHoverBackgroundColor: "#59D896",
						pointHoverBorderColor: "#fff",
						pointHoverBorderWidth: 2,
						pointRadius: 5,
						pointHitRadius: 5,
						fill: true,
						borderWidth: 2,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							stepSize: 5,
						},
					},
				},
			},
		});
	}, []);

	return (
		<div className='shadow-xl p-10 rounded-xl h-96 bg-[#0F0F0F] border border-zinc-800'>
			<div className='flex gap-24 items-center'>
				<h1 className='font-bold text-2xl text-white'>Monthly Traction</h1>
				<div className='flex gap-2'>
					{["MAY", "AUG", "SEP", "OCT", "NOV", "DEC"].map((month, idx) => {
						return (
							<Button
								key={idx}
								onClick={() => setActive(idx)}
								className={`${
									active === idx
										? "bg-gradient-to-tr from-secondary to-primary border border-primary animate-pulse"
										: "bg-zinc-700 border border-zinc-500"
								} px-4 py-2 rounded-md text-xs text-white font-semibold`}>
								{month}
							</Button>
						);
					})}
				</div>
			</div>
			<div className='chart-container'>
				<canvas id='monthly-traction'></canvas>
			</div>
		</div>
	);
};

export default MonthlyTraction;
