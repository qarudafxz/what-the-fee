import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo_only.png";

interface Props {
	message?: string;
	confirmation?: boolean;
	setConfirmation?: React.Dispatch<React.SetStateAction<boolean>>;
	setIsPaymentAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Confirmation: React.FC<Props> = ({
	message,
	confirmation,
	setConfirmation,
	setIsPaymentAdded,
}) => {
	return (
		<>
			{confirmation && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
					<motion.form
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{
							duration: 0.8,
							type: "spring",
							ease: [0, 0.71, 0.2, 0],
						}}
						className='flex flex-col gap-4 p-10 w-5/12 bg-black absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl rounded-md border-t-8 border-[#49B0AD]'>
						<div className='my-8 grid place-items-center text-center justify-center'>
							<img
								src={logo}
								alt='logo'
								className='w-20 h-20'
							/>
							<p className='text-white font-bold text-4xl mt-16 px-24'>{message}</p>
							<div className='flex gap-3 items-center mt-6'>
								<button
									onClick={() => {
										setIsPaymentAdded(true);
										setConfirmation!(false);
									}}
									className='bg-[#49B0AD] px-6 text-white font-bold text-xl py-2 rounded-md'>
									Yes
								</button>
								<button
									onClick={() => {
										setConfirmation!(false);
									}}
									className='border border-[#49B0AD] px-6 text-[#49B0AD] font-bold text-xl py-2 rounded-md'>
									No
								</button>
							</div>
						</div>
					</motion.form>
				</div>
			)}
		</>
	);
};

export default Confirmation;
