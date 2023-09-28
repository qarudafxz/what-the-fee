/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import bg from "../../assets/bg.svg";
import logo from "../../assets/full_logo.png";
import email_3d from "../../assets/email.png";
import { useGetSession } from "../../../hooks/useGetSession";
import TopLoadingBar from "react-top-loading-bar";

export const EmailVerification: FC = () => {
	const navigate = useNavigate();
	const { getSession, removeSession } = useGetSession();
	const [number, setNumber] = useState<string[]>(["", "", "", ""]);
	const [pin, setPin] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const [errMsg, setErrMsg] = useState<string>("");
	const [progress, setProgress] = useState<number>(0);
	const session = getSession("session");
	const student_id = getSession("student_id");
	const email = getSession("email");

	const sendVerification = async (): Promise<void> => {
		setProgress(30);
		const headers = new Headers({
			"Content-Type": "application/json",
			email: email || "",
		} as HeadersInit);

		await fetch("http://localhost:8080/api/auth/get-code", {
			method: "GET",
			headers,
		})
			.then(async (res) => {
				const data = await res.json();
				if (res.status === 200 || res.ok) {
					setProgress(100);
					setPin(data.code);
				}
			})
			.catch((error) => {
				console.error("Error fetching verification code:", error);
			});
	};

	const handleCodeChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, index: number) => {
			const inputValue = e.target.value;
			if (/^\d*$/.test(inputValue) && inputValue.length <= 1) {
				const newNumber = [...number];
				newNumber[index] = inputValue;
				setNumber(newNumber);
				if (error) {
					setError(false);
					setErrMsg("");
				}
			}
		},
		[number]
	);

	const verifyCode = async (): Promise<void> => {
		setProgress(30);
		const inputtedCode = number.join("");

		const headers = new Headers({
			"Content-Type": "application/json",
			session: session || "",
		} as HeadersInit);

		await fetch("http://localhost:8080/api/auth/verify-code", {
			method: "POST",
			headers,
			body: JSON.stringify({
				student_id: student_id,
				code: pin,
				your_code: inputtedCode,
			}),
		})
			.then(async (res) => {
				const data = await res.json();
				if (res.status === 200 || res.ok) {
					removeSession("email");
					removeSession("student_id");
					removeSession("session");
					setTimeout(() => {
						navigate("/");
					}, 2000);
				} else {
					setError(true);
					setErrMsg(data.message);
				}
			})
			.catch((error) => {
				console.error("Error verifying code:", error);
			})
			.finally(() => setProgress(100));
	};

	useEffect(() => {
		sendVerification();
	}, [session]);

	if (!session || !student_id || !email) {
		return <Navigate to='/register' />;
	}

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
			{/* Container */}
			<div className='p-4'>
				<img
					src={logo}
					className='w-26 h-6'
					alt='WTF Logo'
				/>
				<div className='flex justify-center items-center h-screen'>
					<div className='flex flex-col items-center bg-dark rounded-md border border-zinc-500 p-14'>
						<img
							src={email_3d}
							alt='Email Icon'
							className='w-24 h-24'
						/>
						<h1 className='font-bold text-4xl text-primary mt-4'>
							Email Verification
						</h1>
						<p className='w-96 text-center mt-3 text-zinc-500 text-xs'>
							We have sent you a 4-digit pin. Please refer to the mailbox and enter the
							code below.
						</p>
						<div className='grid grid-cols-4 gap-2'>
							{number.map((value, idx) => (
								<input
									key={idx}
									value={value}
									onChange={(e) => handleCodeChange(e, idx)}
									maxLength={1}
									type='text'
									className={`w-16 h-16 bg-transparent border border-zinc-500 rounded-md text-center text-3xl text-primary font-bold mt-6 ${
										error && "border border-red-600 text-red-600"
									}`}
								/>
							))}
						</div>
						{errMsg && (
							<p className='text-xs text-red-600 text-center mt-2'>{errMsg}</p>
						)}
						<p className='mt-2 text-xs text-zinc-400'>
							Didn't get the code?{" "}
							<button
								onClick={sendVerification}
								className='underline italic'>
								Resend code.
							</button>
						</p>
						<button
							onClick={verifyCode}
							className='w-full mt-6 rounded-2xl bg-gradient-to-tr from-secondary to-primary py-4 text-white font-bold text-xl'>
							Confirm
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
