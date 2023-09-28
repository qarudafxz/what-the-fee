import { FC } from "react";
import bg from "../../assets/header.svg";
import { HiUserCircle } from "react-icons/hi";

type Props = {
	title: string;
	description: string;
	name: string | null;
	email: string | null;
	page: number;
};

export const Header: FC<Props> = ({
	title,
	description,
	email,
	name,
	page,
}) => {
	return (
		<div
			className='font-main w-full h-[280px]'
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<div className='pl-64 pr-56 py-10 flex flex-col gap-[3px]'>
				<div className='flex flex-row-reverse justify-between items-center'>
					<></>
					<div className='bg-black text-white rounded-full flex gap-2 items-center pl-8 pr-2 py-1 border border-zinc-500'>
						<div className='flex flex-col'>
							<p className='font-bold text-[15px] text-right'>{name}</p>
							<p className='text-xs text-zinc-500 text-[10px]'>{email}</p>
						</div>
						<HiUserCircle className='w-10 h-10 text-primary' />
					</div>
				</div>
				<p className='text-[#337151] text-semibold'>{title}</p>
				{page === 1 && (
					<h1 className='text-white text-4xl'>
						Welcome back,{" "}
						<span className='font-extrabold'>{name?.split(" ")[0]}</span>
					</h1>
				)}
				{page !== 1 && (
					<h1 className='text-white text-4xl font-extrabold'>{title}</h1>
				)}
				<p className='text-xs text-white font-thin'>{description}</p>
			</div>
		</div>
	);
};
