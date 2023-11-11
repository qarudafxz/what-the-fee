import React from "react";

const ExpensesLogs: React.FC = () => {
	return (
		<div className='col-span-2'>
			<div className='flex flex-col gap-4 px-4 py-5 bg-[#0F0F0F]  opacity-90 rounded-md border border-zinc-600'>
				<h1 className='font-bold text-2xl text-zinc-500'>Expenses</h1>
				<div className='max-h-[250px] overflow-y-auto'></div>
			</div>
		</div>
	);
};

export default ExpensesLogs;
