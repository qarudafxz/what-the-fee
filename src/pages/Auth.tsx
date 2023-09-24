import { useEffect } from "react";
import bg from "../assets/bg.svg";
import logo from "../assets/full_logo.png";
import ccislsg_logo from "../assets/ccislsg_logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineArrowRight } from "react-icons/ai";

type Custom = {
	label: string;
	customization: string;
	link: string;
};

export const Auth = () => {
	const variants: Array<Custom> = [
		{
			label: "Log in",
			customization:
				"flex px-8 py-2 gap-2 rounded-md text-white text-xl font-bold bg-gradient-to-tr from-[#025D59] to-[#59D896]",
			link: "/login",
		},
		{
			label: "Register",
			customization:
				"flex gap-2 px-8 py-2 rounded-md text-xl font-bold border border-green-300	text-primary bg-gradient-to-tr from-[#025D59] to-[#59D896] bg-clip-text text-transparent",
			link: "/register",
		},
	];

	useEffect(() => {
		document.title = "WTF | What The Fee";
	}, []);
	return (
		<div
			className='w-full h-full bg-dark font-main overflow-y-hidden'
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}>
			<div className='xxxxs:mx-6'>
				<div className='flex justify-center items-center h-screen'>
					<div className='flex flex-col justify-center items-center p-4 rounded-md'>
						<img
							src={ccislsg_logo}
							alt='CCISLSG Logo'
							className='w-20 h-20 mb-8'
						/>
						<div className='flex gap-24 items-center'>
							<img
								src={logo}
								alt='logo'
								className='w-32 h-5'
							/>
							<h1 className='text-white font-bold text-2xl'>Options</h1>
						</div>
						<div className='flex gap-3 items-center mt-8'>
							{variants.map((variant, index) => (
								<Link
									to={variant.link}
									key={index}
									className={variant.customization}>
									{variant.label}
									<div>
										<motion.div whileHover={{ x: 10 }}>
											<AiOutlineArrowRight
												className={`inline-block ${index === 1 ? "text-green-300" : ""}`}
												size={30}
											/>
										</motion.div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
			<h1 className='text-center text-white pb-4'>
				All rights reserved 2023 | CCISLSG Extension
			</h1>
		</div>
	);
};
