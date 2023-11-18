import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import bg from "../../assets/bg.svg";
import logo from "../../assets/full_logo.png";
import { IconButton, Input, InputGroup } from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useGetSession } from "../../../hooks/useGetSession";
import { ProgressBar } from "../../components/ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@chakra-ui/react";

export const ForgotPassword: FC = () => {
	const navigate = useNavigate();
	const { getSession } = useGetSession();
	const studentID = getSession("student_id");
	const stage = getSession("secret");
	const [password, setPassword] = useState<string>("");
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const [progress, setProgress] = useState<number>(0);

	const handleVisible = (type: string) => {
		switch (type) {
			case "password":
				setIsVisible(!isVisible);
				break;
		}
	};

	const handleUpdatePassword = async (): Promise<void> => {
		await fetch("http://localhost:8080/api/auth/change-password", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getSession("session")}`,
			},
			body: JSON.stringify({
				stage: stage,
				student_id: studentID,
				password: password,
			}),
		}).then(async (res) => {
			const data = await res.json();
			if (res.ok || res.status === 200) {
				setProgress(100);
				toast.success("Password updated successfully", {
					autoClose: 1400,
				});
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			} else {
				setProgress(0);
				console.log(res);
				toast.error(data.message, {
					autoClose: 1400,
				});
			}
		});
	};

	useEffect(() => {
		if (!stage || stage !== "3" || !studentID) {
			navigate("/login");
		}
	}, [navigate, stage, studentID]);

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
			<TopLoadingBar
				color='#59D896'
				progress={progress}
				height={3}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className='p-4'>
				<img
					src={logo}
					className='w-18 h-6'
					alt='WTF Logo'
				/>
				<div className='flex justify-center items-center h-screen'>
					<div className='flex flex-col'>
						<Tooltip
							hasArrow
							label='Stress Deliver'
							fontSize='md'
							className='bg-dark w-full text-white rounded-md px-4 py-2 text-xs'>
							<img
								src='https://cdn.pixabay.com/animation/2022/08/17/03/45/03-45-12-425_512.gif'
								className='w-10 h-10 mx-auto mb-4'
							/>
						</Tooltip>
						<ProgressBar
							progress='80'
							steps='Murag need nimog memory plus gold. Eme'
						/>
						<div className='bg-dark p-4 rounded-md border border-zinc-600'>
							<h1 className='text-2xl font-bold text-white'>Forgot Password</h1>
							<InputGroup className='relative w-full mt-3'>
								<Input
									onChange={(e) => setPassword(e.target.value)}
									type={isVisible ? "text" : "password"}
									className='w-full bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600 pr-12'
									placeholder='Password'
								/>
								<div className='absolute right-3 top-2'>
									<IconButton
										onClick={() => handleVisible("password")}
										aria-label='Toggle password visibility'
										icon={
											isVisible ? (
												<AiFillEyeInvisible size={23} />
											) : (
												<AiFillEye size={23} />
											)
										}
										className='cursor-pointer text-primary hover:bg-secondary rounded-full duration-200'
									/>
								</div>
							</InputGroup>
							<button
								onClick={handleUpdatePassword}
								className='bg-primary py-2 px-4 rounded-md text-xs font-semibold w-full mt-4'>
								Update password
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
