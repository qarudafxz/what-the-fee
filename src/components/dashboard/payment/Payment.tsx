import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { LuScanLine } from "react-icons/lu";

export const Payment: FC = () => {
	return (
		<div className='font-main bg-[#0F0F0F] opacity-90 rounded-md border border-zinc-600 ml-64 mr-56 p-4 relative bottom-20'>
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
				<button className='bg-zinc-900 text-white py-4 rounded-md'>Search</button>
				<Button
					size='xs'
					className='bg-[#59D896] text-[#268454] font-bold rounded-md py-8 flex flex-col gap-2'>
					<LuScanLine size={50} />
					Scan ID
				</Button>
			</div>
			{/* Names */}
			<div className='grid grid-cols-9 gap-2'>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>First name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Middle name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Last name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
			</div>
			{/* Program, year, semester */}
			<div className='grid grid-cols-9 gap-2 mt-6'>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>First name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Middle name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Last name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
			</div>
			{/* Ar Number, Amount, Status */}
			<div className='grid grid-cols-9 gap-2 mt-6'>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>First name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Middle name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Last name</h1>
					<input
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
			</div>
			<button className='w-full py-2 font-bold text-white text-center rounded-md bg-primary mt-4'>
				Add Payment
			</button>
		</div>
	);
};
