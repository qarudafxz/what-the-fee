import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useAuth } from "../../../../hooks/useAuth";
import Skeleton from "@mui/material/Skeleton";

interface Logs {
	logs_id?: number;
	label: string;
	method: string;
	admin_id: string;
	ar_no: string;
	admin_first_name: string;
	admin_last_name: string;
	created_at: string;
}

const AllLogs: React.FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();
	const email = getSession("email");
	const name = getSession("name");
	const token = getItem("token");
	const admin_id = getSession("student_id");
	const [logs, setLogs] = useState<Logs[]>([]);
	const [loading, setLoading] = useState(false);

	const getLogs = async () => {
		const headers = new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		} as HeadersInit);

		setLoading(true);
		try {
			await fetch("http://localhost:8000/api/logs", {
				method: "GET",
				headers,
			}).then(async (res) => {
				const data = await res.json();
				if (res.ok || res.status === 200) {
					setLogs(data);
					setTimeout(() => {
						setLoading(false);
					}, 1000);
				}
			});
		} catch (err) {
			throw new Error("Error getitng logs");
		}
	};

	useEffect(() => {
		document.title = "Logs | WTF";
		getLogs();
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				page={4}
				name={name}
				title={"All Logs"}
				description={
					"Check all the actions made from other admins to ensure the tracking of pursued actions."
				}
				email={email}
			/>
			<div className='font-main bg-[#0F0F0F] bg-opacity-90 rounded-md border border-zinc-600 ml-64 mr-56 p-4 relative bottom-4'>
				<h1 className='font-bold text-white text-2xl'>Logs</h1>
				<div className='max-h-[450px] overflow-y-auto custom'>
					<div className='flex flex-col gap-2 mt-4'>
						{logs?.map((log, idx) => {
							return (
								<React.Fragment key={idx}>
									{loading ? (
										<Skeleton
											variant='rectangular'
											height={70}
											width={1000}
										/>
									) : (
										<div className='flex justify-between items-center p-4 border-t border-zinc-800'>
											<div className='flex flex-col'>
												<p className='text-zinc-600 text-md'>
													{log.admin_first_name + " " + log.label}
												</p>
												<div className='flex gap-2 items-center'>
													<p className='bg-zinc-800 text-zinc-500 px-2 py-1 rounded-md border border-zinc-500 text-[12px]'>
														{log.ar_no}
													</p>
													<p className='text-zinc-700 rounded-md text-[12px]'>
														{new Date(log.created_at).toLocaleDateString("en-US", {
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
											<p
												className={`px-3 py-1 rounded-md ${
													log.method === "POST"
														? "bg-green-900 text-green-600"
														: log.method === "DELETE"
														? "bg-red-900 text-red-600"
														: log.method === "UPDATE"
														? "bg-yellow-900 text-yellow-600"
														: log.method === "DECLINED"
														? "bg-purple-900 text-purple-600"
														: "" // Default case, add your styles or leave it empty
												}`}>
												{log.method}
											</p>
										</div>
									)}
								</React.Fragment>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllLogs;
