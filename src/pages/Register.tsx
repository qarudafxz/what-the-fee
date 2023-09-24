import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

export const Register: React.FC = () => {
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

	const handleRegister = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrorMessage("Password does not match");
			return;
		}

		const data = {
			firstName,
			lastName,
			studentID,
			email,
			password,
			position,
		};

		try {
			const response = await fetch("http://localhost:8080/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (result.status === "success") {
				setErrorMessage("");
			} else {
				setErrorMessage(result.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

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
								className='w-full bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600 pr-12'
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
								className='w-full bg-transparent border border-primary rounded-md px-4 py-2 text-primary focus:outline-2 outline-blue-600 pr-12'
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
							onSubmit={(e: FormEvent<HTMLFormElement>) => handleRegister(e)}
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
