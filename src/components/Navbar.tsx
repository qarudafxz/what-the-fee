import { FC, ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { PiUserCirclePlusFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import TopLoadingBar from "react-top-loading-bar";

type Navlinks = {
	icon: ReactNode;
	title: string;
	link: string;
};

export const Navbar: FC = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);

	const logout = () => {
		setProgress(50);
		localStorage.clear();
		sessionStorage.clear();

		setTimeout(() => {
			setProgress(100);
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}, 2500);
	};

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
		{
			icon: <PiUserCirclePlusFill />,
			title: "Add Admin",
			link: "/admin/add",
		},
	];
	return (
		<>
			<TopLoadingBar
				progress={progress}
				color='#59D896'
				onLoaderFinished={() => setProgress(0)}
			/>
			<motion.div
				initial={{ x: isOpen ? 0 : -140 }}
				animate={{ x: isOpen ? 0 : -140 }}
				transition={{ duration: 0.2 }}
				className='bg-[#0f0f0f] px-6 py-10 h-screen shadow-2xl w-64 absolute z-10'>
				<div className='flex flex-col gap-2 justify-items-center items-center'>
					<Button
						onClick={() => setIsOpen(!isOpen)}
						className='p-3 rounded-full bg-secondary border-4 border-[#0f0f0f] text-primary relative left-[125px]'>
						<IoIosArrowForward
							size={20}
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
											`${
												idx === 6 && "mt-24 "
											} flex items-center gap-4 text-lg py-2 mt rounded-lg ` +
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
							<div className='mt-40'>
								<hr
									className='mb-2'
									style={{
										border: "1px solid #27272A",
									}}
								/>
								<Button
									onClick={logout}
									className='flex items-center gap-4 text-lg py-2 mt rounded-lg text-zinc-800 hover:text-zinc-600 duration-150'>
									<MdLogout size={23} />
									<span className={`${!isOpen && "hidden"} text-sm font-semibold`}>
										Logout
									</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};
