import { FC } from "react";
import logo from "../assets/logo_only.png";

export const Preloader: FC = () => {
	return (
		<div className='bg-dark h-full w-full'>
			<div className='grid place-content-center h-screen'>
				<img
					src={logo}
					alt='WTF Logo'
					className='w-14 h-14 customEntrance'
				/>
			</div>
		</div>
	);
};
