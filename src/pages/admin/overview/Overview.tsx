/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage.js";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import { Data } from "../../../components/dashboard/overview/Data";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ProgramCards } from "../../../components/dashboard/overview/ProgramCards";
import { Button } from "@chakra-ui/react";
import MonthlyTraction from "../../../components/dashboard/overview/MonthlyTraction.js";
import { AdminList } from "../../../components/dashboard/overview/AdminList.js";
import LatestPayee from "../../../components/dashboard/overview/LatestPayee.js";

type StudentsProps = {
	percentage: number;
	name: string;
	currentPopulation: number;
	totalPopulation: number;
	lastSevenDays: number;
};

export const Overview: FC = () => {
	const [numOfStudents, setNumOfStudents] = useState<StudentsProps[]>([]);
	const isLoggedIn = useAuth();
	const { getItem } = useLocalStorage();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");
	const admin_id = getSession("student_id");
	const token = getItem("token");
	const [loading, setLoading] = useState<boolean>(false);
	const [_, setSem] = useState<number>(0);

	const semesters = [
		{ label: "1st Semester", value: 1 },
		{ label: "2nd Semester", value: 2 },
	];

	const numberOfStudentsPerProgram = async () => {
		try {
			setLoading(true);
			await fetch("http://localhost:8000/api/get-count-programs/", {
				method: "GET",
				//eslint-disable-next-line
				//@ts-ignore
				headers: {
					"Content-Type": "application/json",
					admin_id: admin_id,
					Authorization: `Bearer ${token}`,
				},
			}).then(async (res) => {
				const data = await res.json();
				if (res.status === 200 || res.ok) {
					console.log(data);
					setNumOfStudents(data.students);
					setTimeout(() => setLoading(false), 2000);
				}
			});
		} catch (err) {
			console.error("Error fetching number of students per program:", err);
		}
	};

	const cachedData = useMemo(() => numOfStudents, [numOfStudents]);

	useEffect(() => {
		if (!cachedData || cachedData.length === 0) numberOfStudentsPerProgram();
	}, [cachedData]);

	useEffect(() => {
		document.title = "Records | WTF";
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen overflow-y-hidden'>
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
			<div className='pl-64 pr-56 pb-14 -mt-10 flex flex-col w-full max-h-[400px] overflow-y-auto custom'>
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
						{cachedData.map((program) => {
							return (
								<ProgramCards
									name={program.name}
									percentage={program.percentage}
									currentPopulation={program.currentPopulation}
									totalPopulation={program.totalPopulation}
									last7Days={program.lastSevenDays}
									loading={loading}
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
						<div className='col-span-1 flex flex-col gap-4'>
							<AdminList />
							<LatestPayee />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
