import { FC, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/full_logo.png";
import icon_logo from "../assets/logo_only.png";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@chakra-ui/react";

import { BsGrid1X2Fill } from "react-icons/bs";
import {
	AiFillFileAdd,
	AiFillCalculator,
	AiOutlineMenuUnfold,
} from "react-icons/ai";
import { RiSettings5Fill } from "react-icons/ri";

type Navlinks = {
	icon: ReactNode;
	title: string;
	link: string;
};

export const Navbar: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const navlinks: Navlinks[] = [
		{ icon: <BsGrid1X2Fill />, title: "Overview", link: "/admin/overview" },
		{
			icon: <AiFillFileAdd />,
			title: "Payment Records",
			link: "/admin/records",
		},
		{ icon: <AiFillCalculator />, title: "Add Payment", link: "/admin/payment" },
		{
			icon: <RiSettings5Fill />,
			title: "Admin Settings",
			link: "/admin/settings",
		},
		{
			icon: <AiOutlineMenuUnfold />,
			title: "Admin Requests",
			link: "/admin/requests",
		},
	];
	return (
		<>
			<motion.div
				initial={{ x: isOpen ? 0 : -140 }}
				animate={{ x: isOpen ? 0 : -140 }}
				transition={{ duration: 0.2 }}
				className='bg-[#0f0f0f] px-6 py-10 h-screen shadow-2xl w-64 absolute z-10'>
				<div className='flex flex-col gap-2 justify-items-center items-center'>
					<Button
						onClick={() => setIsOpen(!isOpen)}
						className='p-4 rounded-full bg-secondary border-4 border-[#0f0f0f] text-primary relative left-[125px]'>
						<IoIosArrowForward
							size={30}
							className={`${isOpen && "transform smoothRotate"}`}
						/>
					</Button>
					<div className={`${!isOpen && "pl-32"} mt-10`}>
						<img
							src={isOpen ? logo : icon_logo}
							alt='WTF Logo'
							className={`${isOpen ? "w-34" : "w-6"} h-6`}
						/>
						<div className='mt-10'>
							{navlinks.map((nav, idx) => {
								return (
									<NavLink
										key={idx}
										to={nav.link}
										className={({ isActive }) =>
											`flex items-center gap-4 text-lg py-2 mt rounded-lg ` +
											(isActive
												? "text-white duration-150"
												: "text-zinc-800 hover:text-zinc-600 duration-150")
										}>
										{nav.icon as ReactNode}
										<span className={`${!isOpen && "hidden"} text-sm font-semibold`}>
											{nav.title}
										</span>
									</NavLink>
								);
							})}
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};
