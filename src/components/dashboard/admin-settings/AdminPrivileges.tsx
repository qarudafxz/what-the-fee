/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

interface Admin {
	first_name: string;
	last_name: string;
	email: string;
	can_add: boolean;
	can_delete: boolean;
	can_update: boolean;
	admin_id: string;
}

interface AdminPrivilegesProps {
	permissions: Admin[];
}

const AdminPrivileges: React.FC<AdminPrivilegesProps> = ({ permissions }) => {
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
				{permissions?.map((admin, idx) => {
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
									<h1 className='font-bold text-zinc-800 text-xl'>
										{admin?.first_name + " " + admin?.last_name}
									</h1>
									<p className='text-xs mb-1'>{admin?.email}</p>
									<div className='flex space-x-2 items-center text-sm'>
										{admin?.can_add && (
											<div className='bg-green-500 text-green-200 px-2 py-1 rounded-md'>
												Can add
											</div>
										)}
										{admin?.can_update && (
											<div className='bg-yellow-500 text-yellow-200 e px-2 py-1 rounded-md'>
												Can edit
											</div>
										)}
										{admin?.can_delete && (
											<div className='bg-red-500 text-red-200  px-2 py-1 rounded-md'>
												Can delete
											</div>
										)}
									</div>
								</div>
							</div>
							<button className='bg-primary px-10 py-2 rounded-xl font-bold'>
								Edit
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AdminPrivileges;
