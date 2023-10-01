import { FC, ReactNode } from "react";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

type Props = {
	name: string;
	percentage: number;
	icon: ReactNode;
	currentPopulation: number;
	totalPopulation: number;
	data: number;
};

export const ProgramCards: FC<Props> = ({
	name,
	percentage,
	icon,
	currentPopulation,
	totalPopulation,
	data,
}) => {
	return (
		<motion.div
			whileHover={{ scale: 1.04 }}
			whileTap={{ scale: 0.96 }}
			className='bg-[#0F0F0F] rounded-md border border-zinc-800 p-4'>
			<div className='flex justify-between'>
				<span
					className={`${
						name === "Information System"
							? "text-primary"
							: name === "Computer Science"
							? "text-red-500"
							: "text-blue-500"
					}`}>
					{icon}
				</span>
				<h1 className='text-xs text-white'>
					Bachelor of Science in{" "}
					<span
						className={`${
							name === "Information System"
								? "text-primary"
								: name === "Computer Science"
								? "text-red-500"
								: "text-blue-500"
						}`}>
						{name}
					</span>
				</h1>
			</div>
			<div className='flex justify-between items-center mt-4'>
				<FaUsers
					size={70}
					className={`p-4 rounded-md border ${
						name === "Information System"
							? "border-primary text-secondary border border-dark bg-primary opacity-40"
							: name === "Computer Science"
							? "border-red-900 text-red-900 bg-red-500 opacity-40"
							: "border-blue-500 text-blue-900 bg-blue-500 opacity-40"
					}`}
				/>
				<div className='flex flex-col'>
					<h1 className='font-bold text-white text-7xl'>{percentage}%</h1>
					<p className='text-zinc-700'>of the population</p>
				</div>
			</div>
			<div className='flex gap-4 place-content-center items-center mt-4'>
				<p className='text-center text-xs text-zinc-600'>
					{currentPopulation} out of {totalPopulation}
				</p>
				<p className={`text-xs ${data < 0 ? "text-red-900" : "text-green-800"}`}>
					{data}% for the last 7 days
				</p>
			</div>
		</motion.div>
	);
};
