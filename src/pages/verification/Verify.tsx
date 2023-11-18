import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.svg";
import logo from "../../assets/full_logo.png";
import { QuestionCard } from "../../components/QuestionCard";
import { useGetSession } from "../../../hooks/useGetSession";

export const Verify: FC = () => {
	const navigate = useNavigate();
	const { getSession } = useGetSession();
	const token = getSession("session");

	useEffect(() => {
		if (!token) {
			navigate("/register");
		}
	}, [token]);

	return (
		<div
			className='font-main bg-dark'
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}>
			{/* Container */}
			<div className='p-4'>
				<img
					src={logo}
					className='w-26 h-6'
					alt='WTF Logo'
				/>
				<div className='flex justify-center items-center h-screen'>
					<QuestionCard />
				</div>
			</div>
		</div>
	);
};
