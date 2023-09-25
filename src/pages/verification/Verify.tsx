import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.svg";
import logo from "../../assets/full_logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuestionCard } from "../../components/QuestionCard";
import { useGetSession } from "../../../hooks/useGetSession";

export const Verify: FC = () => {
	const navigate = useNavigate();
	const { token } = useGetSession();
	const [error, setError] = useState<boolean>(false);

	// useEffect(() => {
	// 	if (!token) {
	// 		navigate("/register");
	// 	}
	// }, [token]);

	useEffect(() => {
		if (error) {
			toast.error("Please fill up all fields");
		}
	}, [error]);

	return (
		<div
			className='font-main bg-dark'
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}>
			<ToastContainer />
			{/* Container */}
			<div className='p-4'>
				<img
					src={logo}
					className='w-26 h-6'
					alt='WTF Logo'
				/>
				<div className='flex justify-center items-center h-screen'>
					<QuestionCard setError={setError} />
				</div>
			</div>
		</div>
	);
};
