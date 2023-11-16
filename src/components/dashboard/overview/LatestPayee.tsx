import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";
import Skeleton from "@mui/material/Skeleton";

interface Props {
	acad_year: string;
	admin_id: string;
	amount: string;
	ar_no: string;
	created_at: string;
	date: string;
	desc: string;
	first_name: string;
	last_name: string;
	student_id: string;
}

const LatestPayee: React.FC = () => {
	const { getItem } = useLocalStorage();
	const { getSession } = useGetSession();
	const token = getItem("token");
	const admin_id = getSession("student_id");
	const [loading, setLoading] = useState(false);
	const [latestPayment, setLatestPayment] = useState<Props>();
	const [payeeName, setPayeeName] = useState("");

	const getLatestPayment = async () => {
		const headers = new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		} as HeadersInit);

		setLoading(true);
		try {
			await fetch(`http://localhost:8000/api/latest-payment/`, {
				method: "GET",
				headers,
			}).then(async (res) => {
				const data = await res.json();
				console.log(data);
				if (res.ok || res.status === 200) {
					setLatestPayment(data?.last_payment);
					setPayeeName(
						data?.last_payment?.first_name + " " + data?.last_payment?.last_name
					);
					setTimeout(() => {
						setLoading(false);
					}, 1000);
				}
			});
		} catch (err) {
			throw new Error("Error getting logs");
		}
	};

	useEffect(() => {
		getLatestPayment();
	}, []);

	return (
		<div className='bg-[#0F0F0F] p-4 border border-zinc-800 rounded-md'>
			<h1 className='text-md font-bold text-zinc-600'>Latest Payment</h1>
			<div className='flex flex-col mt-4'>
				<div className='flex items-center justify-between'>
					{loading ? (
						<Skeleton
							variant='text'
							width={180}
							height={35}
						/>
					) : (
						<div className='flex flex-col'>
							<h1 className='font-semibold text-white text-2xl'>
								{payeeName === undefined ? "No payee yet" : payeeName}
							</h1>
							<p className='text-md text-zinc-500'>
								{latestPayment?.student_id ?? "No payee yet"}
							</p>
						</div>
					)}
					{loading ? (
						<Skeleton
							variant='text'
							width={80}
							height={35}
						/>
					) : (
						<h1 className='text-lg font-semibold text-primary'>
							₱{latestPayment?.amount ?? "0"}
						</h1>
					)}
				</div>
				<div className='flex items-center justify-between mt-3'>
					{loading ? (
						<Skeleton
							variant='text'
							width={120}
							height={35}
						/>
					) : (
						<h1
							className={`text-sm ${
								latestPayment?.desc === "partial" ? "text-yellow-600" : "text-green-600"
							}`}>
							{latestPayment?.desc ?? "No payee yet"}
						</h1>
					)}
					{loading ? (
						<Skeleton
							variant='text'
							width={190}
							height={35}
						/>
					) : (
						<h1 className='text-xs font-semibold text-zinc-500'>
							{/* eslint-disable-next-line */}
							{/* @ts-ignore */}
							{new Date(latestPayment?.created_at).toLocaleDateString(
								"en-US",
								{
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								} ?? "No payee yet"
							)}
						</h1>
					)}
				</div>
			</div>
		</div>
	);
};

export default LatestPayee;
