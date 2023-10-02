import { FC } from "react";
import { FaRegUser } from "react-icons/fa";

type Admin = {
	name: string;
	email: string;
};

export const AdminList: FC = () => {
	const temp: Array<Admin> = [
		{ name: "Aubriel Bolotaolo", email: "aubriel.bolotaolo@carsu.edu.ph" },
		{ name: "Francis Tin-ao", email: "francisjohn.tinao@carsu.edu.ph" },
		{ name: "Carlo Gaballo", email: "carlo.gaballo@carsu.edu.ph" },
		{ name: "Le Anne Durango", email: "leanne.durango@carsu.edu.ph" },
		{ name: "Cj Padecio", email: "cj.padecio@carsu.edu.ph" },
	];
	return (
		<div className='bg-[#0F0F0F] p-4 border border-zinc-800 rounded-md'>
			<h1 className='text-white font-bold text-xl mb-4'>List of Admins</h1>
			<div className='flex flex-col gap-6'>
				{temp.map((admin, idx) => {
					return (
						<div
							key={idx}
							className='flex justify-between items-center'>
							<div className='flex gap-2 items-center'>
								<FaRegUser
									size={40}
									className='bg-gradient-to-tr from-secondary to-primary rounded-full border border-primary p-2 text-[#9dffcc]'
								/>
								<div className='flex flex-col'>
									<h1 className='text-white font-bold text-2xl'>{admin.name}</h1>
									<h1 className='text-zinc-400 font-thin text-xs'>{admin.email}</h1>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
