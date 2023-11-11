import React from "react";
import { numberWithCommas } from "../../../../utils/numberWithCommas";

interface Props {
	remainingBalance: React.ReactNode;
}

const RequestExpense: React.FC<Props> = ({ remainingBalance }) => {
	const amount = numberWithCommas(remainingBalance as string);
	return (
		<div className='col-span-5'>
			<div className='font-main bg-[#0F0F0F] opacity-90 rounded-md border border-zinc-600 p-4'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-2xl text-white'>Add some gastusins</h1>
					<p className='bg-[#414141] px-4 py-2 rounded-md font-bold text-zinc-400 border border-zinc-400'>
						Remaining balance: PHP {amount}
					</p>
				</div>
				<div className='grid grid-cols-4 gap-4 items-center w-full mt-10'>
					<div className='col-span-2'>
						<h1 className='font-bold text-xl text-primary mb-1'>Title</h1>
						<input
							type='text'
							className='w-full bg-transparent p-3 rounded-md border border-primary text-primary'
						/>
					</div>
					<div className='col-span-2'>
						<h1 className='font-bold text-xl text-primary mb-1'>Date Borrowed</h1>
						<input
							type='date'
							className='w-full bg-transparent p-3 rounded-md border border-primary text-primary'
						/>
					</div>
					<div className='col-span-4'>
						<h1 className='font-bold text-xl text-primary mb-1'>Amount</h1>
						<input
							type='text'
							className='w-full bg-transparent p-3 rounded-md border border-primary text-primary'
						/>
					</div>
					<div className='col-span-4'>
						<h1 className='font-bold text-xl text-primary mb-1'>Description</h1>
						<textarea className='w-full bg-transparent p-3 rounded-md border border-primary text-primary h-36 resize-none' />
					</div>
					<div className='flex place-content-end items-end justify-end'>
						<button className='bg-primary text-white px-4 py-2 rounded-md font-bold'>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RequestExpense;
