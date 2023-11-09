import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.svg";
import mockup from "../assets/mockup.png";
import logo from "../assets/logo_only.png";
import ccis from "../assets/ccislsg_logo.png";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

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
				className='bg-[#0D0D0D] py-8 xxxxs:px-4 xxxs:px-6 xxs:px-10 xs:px-14 sm:px-18 md:px-20 lg:px-32'
				id='goal'>
				<h1>Hello</h1>
			</div>
		</div>
	);
};

export default Landing;
