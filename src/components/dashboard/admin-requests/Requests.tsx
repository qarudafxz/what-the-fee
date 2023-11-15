/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import Skeleton from "@mui/material/Skeleton";
import { FaRegUser } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

const Requests: React.FC = () => {
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();
	const token = getItem("token");
	const admin_id = getSession("student_id");
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(false);

	const getRequests = async () => {
		const headers = new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		} as HeadersInit);

		setLoading(true);
		try {
			await fetch("http://localhost:8000/api/requests", {
				method: "GET",
				headers,
			}).then(async (res) => {
				const data = await res.json();
				console.log(data);
				if (res.ok || res.status === 200) {
					setRequests(data?.requests);
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
		getRequests();
	}, []);

	return (
		<div className='col-span-2'>
			<div className='flex flex-col gap-4 px-4 py-5 bg-[#0F0F0F]  opacity-90 rounded-md border border-zinc-600'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-2xl text-zinc-500'>Requests</h1>
					<div className='flex gap-4 items-center'>
						<button className='bg-primary px-3 py-2 rounded-md text-md font-bold'>
							Mark all as Read
						</button>
						<button className='bg-primary px-3 py-2 rounded-md text-md font-bold'>
							Clear All
						</button>
					</div>
				</div>
				<div className='flex flex-col gap-2 max-h-[350px] overflow-y-auto custom mt-4'>
					{requests?.map((request: any) => {
						return loading ? (
							<Skeleton
								variant='rectangular'
								width={655}
								height={60}
							/>
						) : (
							<div
								key={request?.id}
								className='flex justify-between bg-white px-4 py-2 items-center'>
								<div className='flex gap-4 items-center'>
									<FaRegUser
										size={50}
										className='bg-gradient-to-br from-zinc-700 to-zinc-900 text-primary rounded-full p-3'
									/>
									<div className=''>
										<h1 className='font-bold text-lg text-zinc-500'>
											{request?.first_name + " " + request?.last_name}
										</h1>
										<p className='text-sm text-zinc-500'>{request?.email}</p>
										<div className='flex gap-2 items-center'>
											<p className='text-sm text-zinc-600 bg-zinc-400 rounded-md px-2 py-1 font-bold'>
												{request?.desc}
											</p>
											<p
												className={`text-sm font-semibold px-2 py-1 rounded-md border ${
													request?.request_type === "DELETE"
														? "bg-red-500 text-red-700 border-red-700"
														: "bg-yellow-500 text-yellow-700 border-yellow-700"
												}`}>
												{request?.request_type}
											</p>
											<p className='text-sm text-zinc-600'>
												Requested on{" "}
												{new Date(request?.created_at).toLocaleDateString("en-US", {
													month: "long",
													day: "2-digit",
													year: "numeric",
													hour: "numeric",
													minute: "numeric",
													hour12: true,
												})}
											</p>
										</div>
									</div>
								</div>
								<HiDotsHorizontal
									size={25}
									className='text-zinc-500 cursor-pointer'
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Requests;
