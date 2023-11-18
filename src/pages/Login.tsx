import React, { useEffect } from "react";
import QrLogin from "../components/QrLogin";
import bg from "../assets/bg.svg";

export const Login: React.FC = () => {
	useEffect(() => {
		document.title = "Log in | WTF";
	}, []);

	return (
		<div
			className='w-full h-screen bg-dark font-main overflow-hidden'
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}>
			<QrLogin />
		</div>
	);
};
