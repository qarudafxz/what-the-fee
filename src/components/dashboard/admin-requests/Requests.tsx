import React from "react";

const Requests: React.FC = () => {
	return (
		<div className='col-span-2'>
			<div className='flex flex-col gap-4 px-4 py-5 bg-[#0F0F0F]  opacity-90 rounded-md border border-zinc-600'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-2xl text-zinc-500'>Requests</h1>
					<div className='flex gap-4 items-center'>
						<button className='bg-primary px-3 py-2 rounded-md text-md font-bold'>
							Mark all as Read
						</button>
						<button className='bg-primary px-3 py-2 rounded-md text-md font-bold'>
							Clear All
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Requests;
