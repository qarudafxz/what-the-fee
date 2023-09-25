import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import poster from "../assets/poster.svg";
import bg from "../assets/bg.svg";
import logo from "../assets/full_logo_whitr.png";
import {
	FormControl,
	Input,
	IconButton,
	InputGroup,
	Checkbox,
	Button,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import TopLoadingBar from "react-top-loading-bar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetSession } from "../../hooks/useGetSession";

export const Register: React.FC = () => {
	const { setSession } = useGetSession();
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const firstInput = useRef<HTMLInputElement>(null);
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [studentID, setStudentID] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [position, setPosition] = useState<string>("");
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isVisible2, setIsVisible2] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);

	const handleVisible = (type: string) => {
		switch (type) {
			case "password":
				setIsVisible(!isVisible);
				break;
			case "confirmPassword":
				setIsVisible2(!isVisible);
				break;
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleRegister = async (e: FormEvent): Promise<void> => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrorMessage("Password does not match");
			return;
		}

		const data = {
			first_name: firstName,
			last_name: lastName,
			student_id: studentID,
			email: email,
			password: password,
			position: position,
		};

		try {
			setProgress(30);
			const response = await fetch("http://localhost:8080/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.status === 200 || response.ok) {
				toast.success(result.message, {
					autoClose: 1400,
				});
				setProgress(100);
				console.log(result);
				setSession("session", result.token);
				setSession("student_id", result.admin.student_id);
				setSession("email", result.admin.email);
				setTimeout(() => {
					navigate("/verification");
				}, 2000);
			} else {
				toast.error(result.message);
				setProgress(100);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (errorMessage) {
			setTimeout(() => {
				setErrorMessage("");
			}, 2000);
		}
	}, [errorMessage]);

	useEffect(() => {
		firstInput?.current?.focus();

		return () => {
			document.title = "Register | WTF";
		};
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
			<ToastContainer />
			<TopLoadingBar
				color='#59D896'
				progress={progress}
				height={3}
				onLoaderFinished={() => setProgress(0)}
			/>
			{/* parent container */}
			<div className='flex flex-row'>
				{/* form */}
				<div className='flex flex-col gap-4 p-8 w-1/2 mx-14 pt-24 pr-44'>
					<h1 className='text-white font-extrabold text-5xl'>Register</h1>
					<h1 className='text-[#4E4E4E] text-2xl font-bold'>
						Already Registered?{" "}
						<Link
							to='/login'
							className='text-primary underline hover:text-secondary duration-200'>
							Login
						</Link>
					</h1>
					<FormControl
						as='fieldset'
						className='mt-10 flex flex-col gap-4'>
						<div className='flex gap-4 items-center'>
							<Input
								required
								className='w-1/2 bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600'
								type='text'
								placeholder='First Name'
								ref={firstInput}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<Input
								className='w-1/2 bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600'
								type='text'
								placeholder='Last Name'
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<InputGroup className='relative w-full'>
							<div className='absolute top-2.5 left-4'>
								<PiIdentificationBadgeFill
									size={23}
									className='text-primary'
								/>
							</div>
							<Input
								type='text'
								onChange={(e) => setStudentID(e.target.value)}
								className='w-full bg-transparent border border-primary rounded-md pl-12 py-2 text-primary focus:outline-2 outline-blue-600'
								placeholder='Student ID'
							/>
						</InputGroup>
						<>
							<div className='bg-white py-3 pl-6 rounded-sm'>
								<h1 className='font-semibold'>Please use your university email.</h1>
							</div>
							<div className='w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-white border-r-[10px] border-r-transparent relative bottom-4 left-10' />
						</>
						<Input
							type='email'
							onChange={(e) => setEmail(e.target.value)}
							className='-mt-9 bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600'
							placeholder='Email'
						/>
						<InputGroup className='relative w-full'>
							<Input
								onChange={(e) => setPassword(e.target.value)}
								type={isVisible ? "text" : "password"}
								className={`w-full bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600 pr-12 ${
									errorMessage === "Password does not match" &&
									"border-red-500 text-red-500"
								}`}
								placeholder='Password'
							/>
							<div className='absolute right-3 top-2'>
								<IconButton
									onClick={() => handleVisible("password")}
									aria-label='Toggle password visibility'
									icon={
										isVisible ? <AiFillEyeInvisible size={23} /> : <AiFillEye size={23} />
									}
									className='cursor-pointer text-primary hover:bg-secondary rounded-full duration-200'
								/>
							</div>
						</InputGroup>
						<InputGroup className='relative w-full'>
							<Input
								type={isVisible2 ? "text" : "password"}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className={`w-full bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600 pr-12 ${
									errorMessage === "Password does not match" &&
									"border-red-500 text-red-500"
								}`}
								placeholder='Confirm Password'
							/>

							<div className='absolute right-3 top-2'>
								<IconButton
									onClick={() => handleVisible("confirmPassword")}
									aria-label='Toggle password visibility'
									icon={
										isVisible2 ? (
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
							<p className='text-red-500 text-xs'>
								{errorMessage === "Password does not match" && errorMessage}
							</p>
						)}
						<Input
							type='text'
							onChange={(e) => setPosition(e.target.value)}
							className='bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600'
							placeholder='Position'
						/>
						<div className='flex gap-2 items-center'>
							<Checkbox
								className='text-primary'
								defaultChecked>
								<p className='text-xs text-whiter'>
									I agree to the terms and condition to be a default super admin and
									handle huge responsibilities
								</p>
							</Checkbox>
						</div>
						<Button
							onClick={(e) => handleRegister(e)}
							rightIcon={<BsArrowReturnRight />}
							className='bg-primary text-secondary py-3 rounded-full font-bold'>
							Register
						</Button>
					</FormControl>
				</div>
				{/* section */}
				<div className='flex flex-col bg-dark w-1/2'>
					<div className='h-auto'>
						<img
							src={poster}
							alt='poster'
							className='w-full max-h-[600px] mt-11 object-cover'
						/>
					</div>
					<div className='bg-primary w-full h-42 py-4 px-10'>
						<img
							src={logo}
							alt='logo'
							className='w-56 h-8'
						/>
						<p className='mt-4 text-[#0B6540]'>
							Manage your fees by using WhatTheFee: An online web platform that manages
							the collection of student fees
						</p>
						<p className='text-xs text-[#33905D] mt-2'>
							All rights reserved {new Date().getFullYear()} | CCISLSG Extension
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
