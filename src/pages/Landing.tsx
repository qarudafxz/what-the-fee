import React, { useEffect } from "react";
import bg from "../assets/bg.svg";
import mockup from "../assets/mockup.png";
import logo from "../assets/logo_only.png";
import ccis from "../assets/ccislsg_logo.png";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsCheckSquareFill } from "react-icons/bs";
import { PiClockCounterClockwise } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import Marquee from "react-fast-marquee";

import mobile from "../assets/mob.png";
import { Aubriel, Le, Cj, Carlo, Fra } from "../assets/member";

const TeamCard: React.FC = () => {
	const data = [
		{
			name: "Aubriel Bolotaolo",
			role: "Database Specialist",
			image: (
				<img
					src={Aubriel}
					className='w-24 h-24 mb-5 border-2 border-primary rounded-full'
				/>
			),
		},
		{
			name: "Le Anne Durango",
			role: "Quality Assurance",
			image: (
				<img
					src={Le}
					className='w-24 h-24 mb-5 border-2 border-primary rounded-full'
				/>
			),
		},
		{
			name: "Carl John Padencio",
			role: "Documenter",
			image: (
				<img
					src={Cj}
					className='w-24 h-24 mb-5 border-2 border-primary rounded-full'
				/>
			),
		},
		{
			name: "Carlo Gaballo",
			role: "Front-end Developer",
			image: (
				<img
					src={Carlo}
					className='w-24 h-24 mb-5 border-2 border-primary rounded-full'
				/>
			),
		},
		{
			name: "Francis Tin-ao",
			role: "Flexible",
			image: (
				<img
					src={Fra}
					className='w-24 h-24 mb-5 border-2 border-primary rounded-full'
				/>
			),
		},
	];

	return (
		<div className='flex space-x-5 items-center'>
			<Marquee
				speed={90}
				direction='right'
				gradient={true}
				gradientColor='#0d0d0d'
				pauseOnHover={true}>
				<div className='w-full flex items-center space-x-6 py-4'>
					{data?.map((member, idx) => {
						return (
							<div
								key={idx}
								className={`bg-[#1f1f1f] flex flex-col justify-center place-items-center p-6 rounded-md shadow-md shadow-black text-center`}>
								{member.image}
								<h1 className='font-bold text-2xl text-primary'>{member.name}</h1>
								<h1 className='text-md italic text-zinc-500'>{member.role}</h1>
							</div>
						);
					})}
				</div>
			</Marquee>
		</div>
	);
};

const Landing: React.FC = () => {
	const menu = [
		{
			title: "Goal",
			link: "goal",
		},
		{
			title: "Features",
			link: "features",
		},
		{
			title: "Team",
			link: "team",
		},
	];

	const blocks = [
		{
			icon: (
				<PiClockCounterClockwise
					size={65}
					className='text-[#4D4D4D]'
				/>
			),
			desc: "Reduce the time it takes to record a payment of college fee.",
		},
		{
			icon: (
				<BsCheckSquareFill
					size={65}
					className='text-[#4D4D4D]'
				/>
			),
			desc: "Ensure that the student fee records are accurate.",
		},
		{
			icon: (
				<AiOutlineFileSearch
					size={65}
					className='text-[#4D4D4D]'
				/>
			),
			desc: "Make it easier to track and locate their fee records.",
		},
		{
			icon: (
				<RiSecurePaymentLine
					size={65}
					className='text-[#4D4D4D]'
				/>
			),
			desc: "Improve the security of student fee records.",
		},
	];

	const getStarted = () => {
		window.location.href = "/auth";
	};

	useEffect(() => {
		document.title = "What The Fee";
	}, []);

	return (
		<div className='w-full font-main overflow-x-hidden'>
			{/* Main section */}
			<div
				id='home'
				className='w-full h-screen bg-black xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'
				style={{
					backgroundImage: `url(${bg})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}>
				{/* PC */}
				<nav className='xxxxs:hidden md:block pt-10'>
					<div className='flex justify-between items-center'>
						<img
							src={logo}
							alt='What The Fee Logo'
							className='w-8 h-8'
						/>
						<div className='flex space-x-10 text-[#49B0AD]'>
							{menu.map((item, index) => (
								<Link
									key={index}
									to={item.link}
									spy={true}
									smooth={true}
									duration={500}
									className='cursor-pointer hover:text-primary duration-200'>
									{item.title}
								</Link>
							))}
						</div>
						<button
							onClick={getStarted}
							className='text-[#49B0AD] py-2 px-4 border border-[#49B0AD] rounded-full'>
							Get Started
						</button>
					</div>
				</nav>
				{/* End of nav pc */}

				{/* Main Section Content */}
				<div className='w-full mt-32'>
					<div className='xxxxs:flex flex-col gap-4 md:grid grid-cols-5 md:gap-4 items-center'>
						<motion.h1
							initial={{ x: -1000 }}
							animate={{ x: 0 }}
							transition={{ duration: 1 }}
							className='col-span-3 text-white font-bold xxxxs:text-2xl md:text-5xl leading-loose'>
							Track and record your college fee collection with ease.
						</motion.h1>
						<motion.div
							initial={{ x: 1000 }}
							animate={{ x: 0 }}
							transition={{ duration: 1, delay: 0.4 }}
							className='col-span-2'>
							<p className='text-zinc-500 xxxxs:text-xs md:text-sm'>
								Managing records that intertwine with money could be nerve-wracking.
								What The Fee offers a wide variety of features that could secure your
								financial records in a hassle free way.
							</p>
							<button
								onClick={getStarted}
								className='mt-4 bg-[#49B0AD] px-6 py-4 text-black font-bold rounded-full'>
								Start Collecting
							</button>
						</motion.div>
					</div>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.3 }}
						className='flex gap-2 items-center mt-20'>
						<img
							src={ccis}
							className='w-16 h-16'
						/>
						<h1 className='text-zinc-500 w-72'>
							Trusted and partnered with{" "}
							<span className='font-bold'>CCIS Local Student Government</span>
						</h1>
					</motion.div>

					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
						className='xxxxs:hidden md:block'>
						<BiSolidDownArrow
							size={200}
							className='text-primary bg-dark rounded-full p-12 relative left-[300px] top-[40px] opacity-90'
						/>
					</motion.div>
					<img
						src={mockup}
						className='xxxxs:hidden md:block absolute right-0 bottom-0 lg:w-[800px]'
					/>
				</div>
			</div>
			{/* Goal */}
			<div
				className='bg-[#0D0D0D] py-56 xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'
				id='goal'>
				<div className='xxxxs:flex flex-col gap-4 md:grid grid-cols-5 space-x-10 items-center'>
					{/* Desc */}
					<motion.div
						initial={{ x: -1000 }}
						animate={{ x: 0 }}
						transition={{ duration: 1 }}
						className='col-span-3 flex flex-col gap-2'>
						<h4 className='font-bold text-primary xxxxs:text-xl md:text-2xl'>Goal</h4>
						<h1 className='text-white font-bold xxxxs:text-2xl md:text-4xl lg:text-5xl w-[350px]'>
							What The Fee aims to...
						</h1>
						<p className='text-zinc-500 xxxxs:text-xs md:text-sm leading-relaxed tracking-wide md:w-[490px]'>
							improve the way student fee records are managed by creating a new system
							that is reliable, efficient, and secure. The new system will use QR codes
							by using School ID to allow students to easily input their record and
							payment information, provide backup receipts, and allow for real-time
							monitoring of student fee records.
						</p>
					</motion.div>
					{/* Blocks */}
					<div className='col-span-2 xxxxs:flex flex-col gap-2 mt-4 md:grid grid-cols-2 md:gap-4'>
						{blocks.map((block, idx) => {
							return (
								<motion.div
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.5, delay: idx + 0.01 }}
									key={idx}
									className='bg-[#181818] rounded-md p-8'>
									<div className='flex flex-col items-center text-center justify-items-center'>
										{block.icon}
										<p className='pt-4 text-sm text-[#4D4D4D]'>{block.desc}</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
			{/* End of goal */}
			{/* Features */}
			<div
				id='features'
				className='bg-[#0D0D0D] py-56 xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'>
				<div className='mt-20 w-full xxxxs:flex flex-col gap-4 md:grid grid-cols-5 space-x-10 items-center'>
					{/* Title */}
					<div className='col-span-3 flex flex-col gap-2'>
						<h4 className='font-bold text-primary xxxxs:text-xl md:text-2xl'>
							Features
						</h4>
						<h1 className='text-white font-bold xxxxs:text-2xl md:text-4xl lg:text-5xl w-[350px]'>
							Smart Management
						</h1>
					</div>
					{/* Desc */}
					<div className='flex flex-col gap-2 w-full'>
						<p className='text-zinc-500 xxxxs:text-xs md:text-sm leading-relaxed tracking-wide md:w-[490px]'>
							What The Fee system equips with fully-packaged features from security up
							to data integrity to ensure the quality of managing financial records and
							collections of the organization.
						</p>
						<div className='flex space-x-4 w-full mt-3'>
							{["Payment", "Monitoring", "Backup", "Automation", "Notification"].map(
								(item, idx) => {
									return (
										<p
											key={idx}
											className='bg-zinc-900 px-4 py-3 text-zinc-500 rounded-md text-xs flex items-center justify-center'>
											{item}
										</p>
									);
								}
							)}
						</div>
					</div>
				</div>
			</div>
			{/* End of features */}
			<div className='bg-[#0D0D0D] py-44 xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'>
				<div className='bg-[#49B0AD] rounded-2xl flex justify-between items-center'>
					<div className='flex flex-col py-10 pl-6 gap-4 w-[490px]'>
						<h1 className='font-bold text-[66px] leading-none text-black '>
							Monitor your balance
						</h1>
						<p className='text-black opacity-70'>
							You can monitor the total amount being collected, your current balance,
							and the amount you've already paid. You can also request a backup receipt
							for your payment.
						</p>
						<button className='bg-[#0D0D0D] text-primary px-4 py-3 text-xl mt-6 font-bold rounded-full shadow-sm shadow-black w-2/4'>
							Sign Up
						</button>
					</div>
					<img
						src={mobile}
						className='h-[450px]	w-[450px] object-contain'
					/>
				</div>
			</div>
			{/* Team */}
			<div
				id='team'
				className='bg-[#0D0D0D] py-56 xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'>
				<h1 className='flex items-center gap-2 mb-24 font-bold text-3xl justify-center text-zinc-600'>
					The team composed of these talented individuals who made{" "}
					<img
						src={logo}
						className='xxxxs:w-7 h-7 md:w-10 md:h-10'
					/>
					possible.
				</h1>
				<TeamCard />
			</div>
			{/* End of team */}
			{/* Contact */}
			<div className='bg-[#0D0D0D] pt-56 xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'>
				<h1 className='font-bold text-7xl text-center text-[#49B0AD]'>
					Start collecting now!
				</h1>
				<div className='flex justify-center items-center mt-8'>
					<button
						onClick={getStarted}
						className='text-[#49B0AD] text-2xl py-4 px-8 border border-[#49B0AD] rounded-full'>
						Get Started
					</button>
				</div>
				{/* Footer */}
				<div className='border-t border-zinc-700 mt-44 py-10 w-full grid grid-cols-5'>
					<img
						src={logo}
						className='col-span-3 w-10 h-10'
						alt='WTF Logo'
					/>
					<div className='col-span-1 flex flex-col gap-4 text-[#49B0AD]'>
						<Link
							to='home'
							className='cursor-pointer font-bold hover:text-primary duration-200'>
							Home
						</Link>
						{menu.map((item, index) => (
							<Link
								key={index}
								to={item.link}
								spy={true}
								smooth={true}
								duration={500}
								className='cursor-pointer font-bold hover:text-primary duration-200'>
								{item.title}
							</Link>
						))}
					</div>
					<h1 className='text-[#49B0AD]'>
						All rights reserved{" "}
						{new Date().toLocaleString("en-US", { year: "numeric" })}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Landing;
