import React, { useEffect } from "react";
import QrLogin from "../components/QrLogin";
import bg from "../assets/bg.svg";

export const Login = () => {
	useEffect(() => {
		document.title = "Log in | WTF";
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
			<QrLogin />
		</div>
	);
};
