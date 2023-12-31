import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";
import Chart from "chart.js/auto";

interface RowProps {
	month: string;
	total_payment: number;
}

const MonthlyTraction = () => {
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();
	const token = getItem("token");
	const admin_id = getSession("student_id");
	const chartRef = useRef(null);
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const headers = new Headers({
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				admin_id: admin_id,
			} as HeadersInit);

			await fetch(`http://127.0.0.1:8000/api/get-total-payment-per-month/1`, {
				method: "GET",
				headers,
			})
				.then(async (res) => {
					const data = await res.json();

					if (res.status === 200 || res.ok) {
						setData(data.monthly_data);
					}
				})
				.catch((error) => {
					console.error("Error fetching monthly traction:", error);
				});
		} catch (err) {
			console.error("Error fetching monthly traction:", err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		const labels = data?.map((row: RowProps) => row?.month);
		const counts = data?.map((row: RowProps) => row?.total_payment);

		if (chartRef.current) {
			//eslint-disable-next-line
			//@ts-ignore
			chartRef.current.destroy();
		}

		//eslint-disable-next-line
		//@ts-ignore
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
						pointRadius: 7,
						pointHitRadius: 3,
						fill: true,
						borderWidth: 2,
						//gap of each labels
						barPercentage: 0.5,
						barThickness: 6,
						maxBarThickness: 8,
						minBarLength: 2,
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
	}, [data]);

	return (
		<div className='shadow-xl p-10 rounded-xl h-[520px] bg-[#0F0F0F] border border-zinc-800'>
			<div className='flex gap-24 items-center'>
				<h1 className='font-bold text-3xl text-white'>
					Monthly Total Collection of year{" "}
					{new Date().toLocaleString("en-us", {
						year: "numeric",
					})}
				</h1>
			</div>
			<div className='chart-container mt-14'>
				<canvas id='monthly-traction'></canvas>
			</div>
		</div>
	);
};

export default MonthlyTraction;
