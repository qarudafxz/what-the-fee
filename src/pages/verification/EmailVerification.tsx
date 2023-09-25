/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect, useCallback } from "react";
import bg from "../../assets/bg.svg";
import logo from "../../assets/full_logo.png";
import email_3d from "../../assets/email.png";
import { useGetSession } from "../../../hooks/useGetSession";
import { sliceNan } from "../../helpers/sliceNan";

export const EmailVerification: FC = () => {
	const { getSession } = useGetSession();
	const session: string | null = getSession("session");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setNumber] = useState<string>("");
	const email = getSession("email");
	let code: Array<number> = [];

	const sendVerification = async () => {
		const headers: HeadersInit = {
			"Content-Type": "application/json",
		};
		if (session) {
			headers.session = session!;
		}

		await fetch("http://localhost:8080/api/auth/send-code", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
			}),
		});
	};

	const handleCodeChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.value;
			if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
				setNumber(inputValue);
				code.push(parseInt(inputValue));
				// Slice NaN values here and assign the result back to the code variable
				code = sliceNan(code);
				console.log(code);
			}
		},
		[]
	);

	useEffect(() => {
		sendVerification();
	}, []);

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
							{[1, 2, 3, 4].map((_, idx) => {
								return (
									<input
										onChange={handleCodeChange}
										maxLength={1}
										key={idx}
										type='text'
										className='w-16 h-16 bg-transparent border border-zinc-500 rounded-md text-center text-3xl text-primary font-bold mt-6'
									/>
								);
							})}
						</div>
						<p className='mt-2 text-xs text-zinc-400'>
							Didn't get the code?{" "}
							<button className='underline italic'>Resend code.</button>
						</p>
						<button className='w-full mt-6 rounded-2xl bg-gradient-to-tr from-secondary to-primary py-4 text-white font-bold text-xl'>
							Confirm
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
