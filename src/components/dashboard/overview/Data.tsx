import { FC } from "react";
import { FaPesoSign } from "react-icons/fa6";

export const Data: FC = () => {
	return (
		<div className='font-main bg-dark opacity-90 w-full h-40 flex flex-col gap-2 rounded-md relative bottom-14 border border-zinc-800 p-4 pt-6'>
			<div className='grid grid-cols-4 items-center gap-16'>
				<div className='col-span-2 flex flex-col gap-2 items-center text-white'>
					<div className='flex gap-2'>
						<h1 className='font-bold text-3xl'>Total Collection</h1>
						<p className='text-sm text-zinc-600'>
							As of{" "}
							{new Date().toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
					</div>
					{/* Money */}
					<h1 className='flex items-center text-6xl font-extrabold text-primary'>
						<FaPesoSign />
						423,945.00
					</h1>
				</div>
				{/* stats 2 */}
				<div className='flex flex-col'>
					<p className='text-zinc-800 text-sm'>
						Last 7 days <span className='text-green-600'>+7.43%</span>
					</p>
					<h1 className='font-bold text-2xl text-zinc-600'>+₱ 3,500.00</h1>
				</div>
				{/* stats 3 */}
				<div className='flex flex-col'>
					<p className='text-zinc-800 text-sm'>
						Last 30 days <span className='text-green-600'>+56.0%</span>
					</p>
					<h1 className='font-bold text-2xl text-zinc-600'>+₱ 78,948.00</h1>
				</div>
			</div>
		</div>
	);
};
