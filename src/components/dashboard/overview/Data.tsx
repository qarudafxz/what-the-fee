import { FC, useEffect, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import { FaPesoSign } from "react-icons/fa6";
import { useCounter } from "../../../../hooks/useCounter";
import { useGetSession } from "../../../../hooks/useGetSession";
import { numberWithCommas } from "../../../../utils/numberWithCommas";

export const Data: FC = () => {
	const [totalPayment, setTotalPayment] = useState<number>(0);
	const [paymentOf7Days] = useState<number>(0);
	const [paymentOf30Days] = useState<number>(0);
	const { getSession } = useGetSession();
	// const last7Days = useCounter(3500, 0.9);
	// const last30Days = useCounter(78948, 0.9);
	const college_id = getSession("college_id");

	const fetchTotalPayment = async () => {
		try {
			const headers = new Headers({
				"Content-Type": "application/json",
			} as HeadersInit);

			await fetch(`http://localhost:8000/api/get-total-payment/${college_id}`, {
				method: "GET",
				headers,
			})
				.then(async (res) => {
					const data = await res.json();
					if (res.status === 200 || res.ok) {
						setTotalPayment(data.total_payment);
					}
				})
				.catch((error) => {
					console.error("Error fetching total payment:", error);
				});
		} catch (err) {
			console.error("Error fetching total payment:", err);
		}
	};

	useEffect(() => {
		fetchTotalPayment();
	}, []);

	return (
		<div className='font-main bg-[#131313] opacity-90 w-full h-40 flex flex-col gap-2 rounded-md relative bottom-14 border border-zinc-800 p-4 pt-6'>
			<div className='grid grid-cols-4 items-center gap-16'>
				<div className='col-span-2 flex flex-col gap-2 items-center text-white'>
					<div className='flex gap-2'>
						<h1 className='font-bold text-3xl'>Total Collection</h1>
						<p className='text-sm text-zinc-600'>
							As of{" "}
							{new Date().toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
					</div>
					<h1 className='flex items-center text-6xl font-extrabold text-primary'>
						<FaPesoSign />
						{numberWithCommas(useCounter(totalPayment, 0.4).toFixed(2).toString())}
					</h1>
				</div>
				{/* stats 2 */}
				<div className='flex flex-col'>
					<p className='text-zinc-700 text-sm'>
						Last 7 days <span className='text-green-600'>+7.43%</span>
					</p>
					<Tooltip
						hasArrow
						label='Percentage came from calculating the difference of the last 7 days and the previous 7 days.'
						fontSize='md'
						className='bg-dark w-full text-white rounded-md px-4 py-2 text-xs'>
						<h1 className='font-bold text-2xl text-zinc-500'>
							+₱ {paymentOf7Days.toFixed(2)}
						</h1>
					</Tooltip>
				</div>
				{/* stats 3 */}
				<div className='flex flex-col'>
					<p className='text-zinc-700 text-sm'>
						Last 30 days <span className='text-green-600'>+56.0%</span>
					</p>
					<Tooltip
						hasArrow
						label='Percentage came from calculating the difference of the last 30 days and the previous 30 days.'
						fontSize='md'
						className='bg-dark w-full text-white rounded-md px-4 py-2 text-xs'>
						<h1 className='font-bold text-2xl text-zinc-500'>
							+₱ {paymentOf30Days.toFixed(2)}
						</h1>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};
