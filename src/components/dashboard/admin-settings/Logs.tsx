import React, { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import logs from "../../../../data/logs.json";

const Logs: React.FC = () => {
	const [hovered, setHovered] = useState(false);
	return (
		<div className='font-main bg-[#131313] rounded-xl border border-zinc-700 p-2'>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl font-bold text-white'>Logs</h1>
				<button
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					className='text-sm text-white flex items-center'>
					See more{" "}
					<motion.button
						initial={{ x: 0 }}
						animate={{ x: hovered ? 7 : 0 }}
						transition={{ duration: 0.2 }}>
						<BiRightArrowAlt
							onMouse
							size={20}
						/>
					</motion.button>
				</button>
			</div>
			{/* Actual logs */}
			<div className='flex flex-col mt-4'>
				{logs?.map((log, idx) => {
					return (
						<div
							key={idx}
							className='flex justify-between items-center p-4 bg-[#0e0e0e]'>
							<p className='text-zinc-600'>{log.title}</p>
							<p
								className={`p-1 rounded-md ${
									log.method === "POST"
										? "bg-green-900 text-green-600"
										: `${
												log.method === "DELETE"
													? "bg-red-900 text-red-600"
													: `${log.method === "PUT" && "bg-yellow-900 text-yellow-600"}`
												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  }`
								}`}>
								{log.method}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Logs;
