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
			<div className='pl-64 pr-56 flex flex-col w-full'>
				<Data />
				<div className='w-full grid grid-cols-6'>
					<h1 className='col-span-5 text-white font-bold text-4xl'>Overview</h1>
					{/* change the color of the text on the form control */}
					<FormControl
						sx={{
							m: 1,
							minWidth: 120,
							"& label.Mui-focused": {
								color: "white",
								fontSize: "1rem",
								borderColor: "white",
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
				</div>
			</div>
		</div>
	);
};
