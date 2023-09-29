/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import bg from "../../assets/bg.svg";
import logo from "../../assets/full_logo.png";
import { useGetSession } from "../../../hooks/useGetSession";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { ProgressBar } from "../../components/ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Questions = {
	question: string;
	answer: string;
};

export const AdminsQuestion: FC = () => {
	const { getSession, setSession, removeSession } = useGetSession();
	const navigate = useNavigate();
	const stage = getSession("secret");
	const session = getSession("session");
	const studentId = getSession("student_id");
	const [firstName, setFirstName] = useState<string>("");
	const [selectedQuestion, setSelectedQuestion] = useState<Questions | null>(
		null
	);
	const [answer, setAnswer] = useState<string>("");
	const [tries, setTries] = useState<number>(3);

	const proceedLogin = async () => {
		try {
			if (tries !== 1) {
				if (answer !== selectedQuestion?.answer) {
					setSession("tries", tries.toString());
					setTries(tries - 1);
					toast.error("Wrong answer, please try again");
				} else {
					removeSession("tries");
					setSession("secret", "3");
					setTimeout(() => {
						navigate("/enter-password");
					}, 1000);
				}
			} else {
				//remove everything from session
				removeSession("session");
				removeSession("tries");
				removeSession("secret");
				removeSession("student_id");
				removeSession("email");
				toast.error("You have 0 tries left, please try again later", {
					autoClose: 1200,
				});
				setTimeout(() => {
					navigate("/login");
				}, 2400);
				return;
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getAdmins = async () => {
		try {
			await fetch("http://localhost:8080/api/auth/info", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					student_id: studentId || "",
					session: session || "",
				},
			}).then(async (res) => {
				const data = await res.json();
				if (res.status === 200 || res.ok) {
					setFirstName(data.admin.first_name);
					//parse the questions to JSON and make it an array
					const random = Math.floor(Math.random() * data.questions.length);

					console.log(random);
					setSelectedQuestion(() => {
						return {
							question: data.questions[random].question,
							answer: data.questions[random].answer,
						};
					});
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAdmins();
	}, [studentId]);

	if ((!stage && !session) || stage !== "2") {
		return <Navigate to='/login' />;
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
			<ToastContainer />
			<div className='flex flex-row justify-between w-full'>
				<div className='w-1/2 p-8'>
					<img
						src={logo}
						className='w-18 h-6'
						alt='WTF Logo'
					/>
				</div>
				<div className='bg-dark h-screen w-2/5'>
					{/* form */}

					<div className='flex flex-col justify-center items-center gap-4 mx-14 py-10 px-4'>
						<ProgressBar
							progress='60'
							steps='2 out of 4'
						/>
						<div className='flex justify-between items-center'>
							<div className='flex flex-col'>
								<h1 className='font-bold text-white text-2xl'>Hello, {firstName}</h1>
								<p className='text-xs text-white'>{studentId}</p>
							</div>
							<div className='flex flex-col w-1/2'>
								<h1 className='text-white text-xl'>{tries} tries left</h1>
								<p className='text-xs text-zinc-500 leading-tight'>
									Note that if you have 0 tries left, you will be redirected back to scan
									your ID
								</p>
							</div>
						</div>
					</div>
					<div className='px-20'>
						<FormControl
							as='fieldset'
							className='mt-10'>
							<div className='bg-[#121212] rounded-md h-40 w-full py-4 pl-6'>
								<h1 className='text-xs text-white'>{selectedQuestion?.question}</h1>
							</div>
							<div className='w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-[#121212] border-r-[10px] border-r-transparent relative bottom-0 left-4' />
						</FormControl>

						<Input
							type='text'
							onChange={(e) => setAnswer(e.target.value)}
							className='mt-10 w-full border border-zinc-800 bg-transparent rounded-md h-20 pl-4 text-white'
							placeholder='Your answer here'
						/>
						<Button
							onClick={proceedLogin}
							className='mt-10 w-full bg-gradient-to-tr from-[#025D59] to-[#59D896] rounded-md py-4 text-white font-bold text-xl'>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
