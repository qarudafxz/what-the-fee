/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Skeleton } from "@chakra-ui/react";

interface Expenses {
	loading: boolean;
	expenses: any[];
}

const ExpensesLogs: React.FC<Expenses> = ({ expenses, loading }) => {
	return (
		<div className='col-span-3'>
			<div className='flex flex-col gap-4 px-4 py-5 bg-[#0F0F0F]  opacity-90 rounded-md border border-zinc-600'>
				<h1 className='font-bold text-2xl text-zinc-500'>Expenses</h1>
				<div className='max-h-[380px] overflow-y-auto flex flex-col gap-4'>
					{expenses?.map((ex, idx) => {
						return (
							<div
								key={idx}
								className='flex justify-between gap-4'>
								<div className='flex flex-col gap-1'>
									{loading ? (
										<Skeleton
											variant='text'
											height={20}
											width={80}
											startColor='rgba(255, 255, 255, 0.1)'
											endColor='rgba(255,255,255,0)'
										/>
									) : (
										<h1 className='font-bold text-sm text-zinc-600'>{ex.title}</h1>
									)}
									{loading ? (
										<Skeleton
											variant='text'
											height={20}
											width={140}
											startColor='rgba(255, 255, 255, 0.1)'
											endColor='rgba(255,255,255,0)'
										/>
									) : (
										<p className='text-xs text-zinc-600'>
											Date Requested:{" "}
											{new Date(ex?.created_at as Date).toLocaleDateString("en-US", {
												month: "long",
												day: "2-digit",
												year: "numeric",
												hour: "numeric",
												minute: "numeric",
												hour12: true,
											})}
										</p>
									)}
								</div>
								{loading ? (
									<Skeleton
										variant='rectangular'
										height={50}
										width={120}
										startColor='rgba(255, 255, 255, 0.1)'
										endColor='rgba(255,255,255,0)'
									/>
								) : (
									<p className='font-bold text-xs bg-zinc-800 text-zinc-600 px-4 py-1 rounded-md border border-zinc-600 flex justify-center place-items-center'>
										PHP {ex?.amount}
									</p>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<button className='font-bold bg-[#0F0F0F] text-center py-4 rounded-md border border-zinc-700 text-zinc-700 w-full mt-4'>
				Generate LR
			</button>
		</div>
	);
};

export default ExpensesLogs;
