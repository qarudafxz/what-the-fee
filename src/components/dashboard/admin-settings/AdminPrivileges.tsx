import React from "react";
import { HiOutlinePlusSm } from "react-icons/hi";

const AdminPrivileges: React.FC = () => {
	return (
		<div className='font-main bg-[#131313] rounded-md border border-zinc-700 p-2'>
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
		</div>
	);
};

export default AdminPrivileges;
