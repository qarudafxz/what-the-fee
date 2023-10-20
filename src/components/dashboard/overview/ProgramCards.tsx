import { FC, ReactNode } from "react";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { TbDiamondsFilled } from "react-icons/tb";
import { BsFillSuitSpadeFill, BsSuitClubFill } from "react-icons/bs";
import Skeleton from "@mui/material/Skeleton";

type Props = {
	name: string;
	percentage?: number;
	loading: boolean;
	currentPopulation: number;
	totalPopulation: number;
};

export const ProgramCards: FC<Props> = ({
	name,
	percentage,
	loading,
	currentPopulation,
	totalPopulation,
}) => {
	const icons: ReactNode[] = [
		<BsFillSuitSpadeFill />,
		<TbDiamondsFilled />,
		<BsSuitClubFill />,
	];

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
					{name === "Information System"
						? icons[0]
						: name === "Computer Science"
						? icons[1]
						: icons[2]}
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
					{loading ? (
						<Skeleton
							variant='text'
							width={120}
							height={90}
						/>
					) : (
						<div>
							<h1 className='font-bold text-white text-5xl'>
								{percentage?.toFixed(2)}%
							</h1>
							<p className='text-zinc-700'>of the population</p>
						</div>
					)}
				</div>
			</div>
			<div className='flex gap-4 place-content-center items-center mt-4'>
				{loading ? (
					<Skeleton
						variant='text'
						width={80}
						height={40}
					/>
				) : (
					<p className='text-center text-xs text-zinc-600'>
						{currentPopulation} out of {totalPopulation}
					</p>
				)}
				<p className={`text-xs text-green-800`}>0% for the last 7 days</p>
			</div>
		</motion.div>
	);
};
