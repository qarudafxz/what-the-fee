import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const Landing = () => {
	const navigate = useNavigate();
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
			title: "About Us",
			link: "about",
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
		navigate("/auth");
	};

	useEffect(() => {
		document.title = "What The Fee";
	}, []);

	return (
		<div className='w-full font-main overflow-x-hidden'>
			{/* Main section */}
			<div
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
					<div className='xxxxs:flex flex-col gap-4 md:grid grid-cols-5 gap-4 items-center'>
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
						transition={{ duration: 0.3, delay: 1 }}
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

					<motion.img
						initial={{ opacity: 0, scale: 0.2 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 1.5 }}
						src={mockup}
						className='xxxxs:hidden md:block absolute right-0 bottom-0 lg:w-[800px]'
					/>
				</div>
			</div>
			{/* Goal */}
			<div
				className='bg-[#0D0D0D] py-14 xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'
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
				className='bg-[#0D0D0D] py-14 xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'>
				<div className='mt-20 xxxxs:flex flex-col gap-4 md:grid grid-cols-5 space-x-10 items-center'>
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
					<p className='text-zinc-500 xxxxs:text-xs md:text-sm leading-relaxed tracking-wide md:w-[490px]'>
						What The Fee system equips with fully-packaged features from security up
						to data integrity to ensure the quality of managing financial records and
						collections of the organization.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Landing;
