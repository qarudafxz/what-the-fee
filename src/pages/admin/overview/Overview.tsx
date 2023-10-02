/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import { Data } from "../../../components/dashboard/overview/Data";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { temp } from "../../../../data/temp.jsx";
import { ProgramCards } from "../../../components/dashboard/overview/ProgramCards";
import { Button } from "@chakra-ui/react";
import MonthlyTraction from "../../../components/dashboard/overview/MonthlyTraction.js";
import { AdminList } from "../../../components/dashboard/overview/AdminList.js";

export const Overview: FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");
	const [sem, setSem] = useState<number>(0);

	const semesters = [
		{ label: "1st Semester", value: 1 },
		{ label: "2nd Semester", value: 2 },
	];

	useEffect(() => {
		document.title = "Records | WTF";
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				page={1}
				name={name}
				title={"Overview"}
				description={"have a glimpse of the status of your college fee"}
				email={email}
			/>
			<div className='pl-64 pr-56'>
				<Data />
			</div>
			<div className='pl-64 pr-56 -mt-10 flex flex-col w-full max-h-[390px] overflow-y-auto custom'>
				<div className='w-full flex justify-between items-center'>
					<h1 className='text-white font-bold text-4xl'>Overview</h1>
					{/* change the color of the text on the form control */}
					<div className='flex gap-2 items-center'>
						<FormControl
							sx={{
								m: 1,
								minWidth: 120,
								"& label.Mui-focused": {
									color: "white",
									fontSize: "1rem",
									borderColor: "white",
								},

								"& .MuiSelect-icon": {
									color: "white",
								},

								"& .MuiInput-underline:after": {
									borderBottomColor: "white",
								},

								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										borderColor: "#353535",
									},
									"&:hover fieldset": {
										borderColor: "#353535",
									},
									"& .MuiSelect-root": {
										color: "white",
										fontSize: "1rem",
									},
									"& .MuiInputBase-input": {
										color: "white",
										fontSize: "1rem",
									},
								},
								"& .MuiInputLabel-root": {
									color: "white",
									fontSize: "1rem",
								},
								"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
									{
										borderColor: "#353535",
									},
							}}
							className='bg-[#131313] rounded-md border border-zinc-200'>
							<InputLabel id='label'>Semester</InputLabel>
							<Select
								labelId='label'
								id='demo-simple-select-helper'
								label='Semester'
								onChange={(e: SelectChangeEvent) =>
									setSem(e.target.value as unknown as number)
								}>
								{semesters.map((semester) => {
									return <MenuItem value={semester.value}>{semester.label}</MenuItem>;
								})}
							</Select>
						</FormControl>
						<Button className='bg-zinc-900 py-4 px-4 text-white rounded-md border border-zinc-700'>
							Filter
						</Button>
					</div>
				</div>
				{/* Other data*/}
				{/* This must be scrollable vertically */}
				<div className='w-full'>
					<div className='grid grid-cols-3 gap-4 mt-4 w-full'>
						{temp.map((program) => {
							return (
								<ProgramCards
									name={program.name}
									percentage={program.percentage}
									icon={program.icon}
									currentPopulation={program.currentPopulation}
									totalPopulation={program.totalPopulation}
									data={program.data}
								/>
							);
						})}
						<div className='col-span-2'>
							{/* Graph and Pagination */}
							<div className='flex flex-col gap-4'>
								<MonthlyTraction />
							</div>
						</div>
						{/* Names */}
						<div className='col-span-1'>
							<AdminList />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
