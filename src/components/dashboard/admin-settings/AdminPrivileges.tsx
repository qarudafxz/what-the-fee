import React from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

const AdminPrivileges: React.FC = () => {
	return (
		<div className='font-main bg-[#131313] rounded-2xl border border-zinc-700 p-2 col-span-2'>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<h1 className='text-white font-bold text-2xl'>People with Access</h1>
				<button className='bg-[#2a2a2a] border border-zinc-600 font-bold flex items-center gap-2 text-white rounded-md px-3 py-1'>
					Add
					<HiOutlinePlusSm
						className='text-white'
						size={20}
					/>
				</button>
			</div>
			{/* Admin List mapped */}
			<div className='flex flex-col mt-6'>
				{["Aubriel Bolotaolo", "Carlo Gaballo", "Le Anne Durango"]?.map(
					(admin, idx) => {
						return (
							<div
								key={idx}
								className='p-3 bg-white border border-zinc-500 flex justify-between'>
								<div className='flex gap-6 items-center'>
									<FaRegUser
										size={60}
										className='bg-gradient-to-br from-zinc-700 to-zinc-950 rounded-full p-4 text-primary'
									/>
									<div className='text-zinc-950'>
										<h1 className='font-bold text-zinc-800 text-2xl'>{admin}</h1>
										<p>Receive payments, send notification, and monitor transaction</p>
									</div>
								</div>
								<button>Edit</button>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
};

export default AdminPrivileges;
