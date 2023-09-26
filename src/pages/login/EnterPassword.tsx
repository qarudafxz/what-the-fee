import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import bg from "../../assets/bg.svg";
import logo from "../../assets/full_logo.png";
import { IconButton, Input, InputGroup } from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useGetSession } from "../../../hooks/useGetSession";
import { useLocalStorage } from "../../../hooks/useLocaleStorage";
import { ProgressBar } from "../../components/ProgressBar";

export const EnterPassword: FC = () => {
	const navigate = useNavigate();
	const { getSession } = useGetSession();
	const { setItem } = useLocalStorage();
	const studentID = getSession("student_id");
	const stage = getSession("secret");
	const [password, setPassword] = useState<string>("");
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [progress, setProgress] = useState<number>(0);

	const handleVisible = (type: string) => {
		switch (type) {
			case "password":
				setIsVisible(!isVisible);
				break;
		}
	};

	const handleLogin = async () => {
		try {
			setProgress(50);
			await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					student_id: studentID,
					password: password,
				}),
			}).then(async (res) => {
				const data = await res.json();
				if (res.ok || res.status === 200) {
					setItem("token", data.token);
					setProgress(100);
					navigate("/enter-otp");
				} else {
					setProgress(100);
					setError(true);
					setErrorMessage(data.message);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(false);
				setErrorMessage("");
			}, 2000);
		}
	}, [error]);

	useEffect(() => {
		if (!stage || stage !== "3") {
			navigate("/login");
		}
	}, [stage]);

	return (
		<div
			className='font-main bg-dark'
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}>
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
						<ProgressBar
							progress='80'
							steps='3 out of 4'
						/>
						<div className='bg-dark p-4 rounded-md border border-zinc-600'>
							<h1 className='text-2xl font-bold text-white'>Enter Password</h1>
							<InputGroup className='relative w-full mt-3'>
								<Input
									onChange={(e) => setPassword(e.target.value)}
									type={isVisible ? "text" : "password"}
									className={`w-full bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600 pr-12 ${
										error && "border border-red-600 text-red-600"
									}`}
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
							{errorMessage && (
								<p className='text-xs text-center text-red-600 mt-2'>{errorMessage}</p>
							)}
							<div className='flex justify-between items-center mt-4'>
								<button className='italic text-xs text-zinc-600 underline'>
									Forgot password
								</button>
								<button
									onClick={handleLogin}
									className='bg-primary py-2 px-4 rounded-md text-xs font-semibold'>
									Proceed
								</button>
							</div>
							P
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
