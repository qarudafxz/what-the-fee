import { FC } from "react";
import { Button } from "@chakra-ui/react";

export const Payment: FC = () => {
	return (
		<div className='font-main bg-[#0F0F0F] opacity-90 rounded-md border border-zinc-600 ml-64 mr-56 p-10 relative bottom-14'>
			<h1 className='font-bold text-white text-3xl pb-8'>Payment Details</h1>
			<div className='grid grid-cols-6 text-primary gap-x-4'>
				<div className='col-span-3 flex flex-col'>
					<p className='font-semibold'>Date</p>
					<input
						type='date'
						placeholder='Date'
						className='bg-transparent p-3 rounded-md border border-primary mt-4'
					/>
				</div>
				<div className='col-span-1 flex flex-col'>
					<p className='font-semibold'>ID Number</p>
					<input
						type='text'
						placeholder=''
						className='bg-transparent p-3 rounded-md border border-primary mt-4'
					/>
				</div>
				<Button size='xs'>Search</Button>
			</div>
		</div>
	);
};
