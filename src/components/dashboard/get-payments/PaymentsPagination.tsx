import React from "react";
import { Input } from "@chakra-ui/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaymentsPagination = () => {
	return (
		<div className='text-white font-main bg-[#131313] opacity-90 w-full h-full flex flex-col gap-2 rounded-md border border-zinc-800 p-10'>
			<div className='grid grid-cols-7 gap-4 mb-4'>
				<h1 className='col-span-1 font-bold text-3xl'>Student</h1>
				<Input
					className='col-span-3 rounded-md bg-transparent border border-zinc-800 pl-4'
					placeholder='Search'
				/>
			</div>
			<Stack spacing={2}>
				<Pagination
					count={10}
					variant='outlined'
					shape='rounded'
					color='secondary'
				/>
			</Stack>
		</div>
	);
};

export default PaymentsPagination;
