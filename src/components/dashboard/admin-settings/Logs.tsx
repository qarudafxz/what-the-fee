import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
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

const Logs: React.FC = () => {
	const navigate = useNavigate();
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();
	const token = getItem("tokn");
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
					setLogs(data?.slice(0, 4));
					setTimeout(() => {
						setLoading(false);
					}, 1000);
				}
			});
		} catch (err) {
			throw new Error("Error getitng logs");
		}
	};

	const showAllLogsLink = () => {
		navigate("/admin/all-logs");
	};

	useEffect(() => {
		getLogs();
	}, []);

	const [hovered, setHovered] = useState(false);
	return (
		<div className='font-main bg-[#131313] rounded-xl border border-zinc-700 p-2'>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-bold text-white'>Logs</h1>
				<button
					onClick={showAllLogsLink}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					className='text-sm text-white flex items-center gap-2'>
					See all{" "}
					<motion.button
						initial={{ x: 0 }}
						animate={{ x: hovered ? 7 : 0 }}
						transition={{ duration: 0.2 }}>
						<BiRightArrowAlt size={20} />
					</motion.button>
				</button>
			</div>
			{/* Actual logs */}
			<div className='flex flex-col mt-4'>
				{logs?.map((log, idx) => (
					<React.Fragment key={idx}>
						{loading ? (
							<Skeleton
								variant='rectangular'
								height={50}
								width={330}
							/>
						) : (
							<div className='flex justify-between items-center p-4 bg-[#0e0e0e]'>
								<div className='flex flex-col'>
									<p className='text-zinc-600 text-sm'>
										{log.admin_first_name + " " + log.label}
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

								<p
									className={`p-1 rounded-md ${
										log.method === "POST"
											? "bg-green-900 text-green-600"
											: log.method === "DELETE"
											? "bg-red-900 text-red-600"
											: log.method === "PUT"
											? "bg-yellow-900 text-yellow-600"
											: "" // Default case, add your styles or leave it empty
									}`}>
									{log.method}
								</p>
							</div>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default Logs;
