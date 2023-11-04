import { FC, useState } from "react";
import { Input } from "@chakra-ui/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AiOutlineScan } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";

type PaymentsProps = {
	ar_no: string;
	created_at: Date;
	student_id: string;
	first_name: string;
	last_name: string;
	program_name: string;
	semester_name: string;
	student?: {
		first_name: string;
		last_name: string;
	};
	program?: {
		program_name: string;
	};
	semester?: {
		semester_name: string;
	};
	collector?: {
		first_name: string;
		last_name: string;
	};
	desc: string;
	amount: number;
	admin_first_name: string;
	admin_last_name: string;
	acad_year: string;
};

const PaymentsPagination: FC<{ payments: PaymentsProps[] }> = ({
	payments,
}) => {
	const [page, setPage] = useState(1);
	const rowsPerPage = 7;

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const indexOfLastRow = page * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;
	const currentRows = payments.slice(indexOfFirstRow, indexOfLastRow);
	return (
		<div className='text-white font-main bg-[#131313] opacity-90 w-full flex flex-col gap-2 rounded-md border border-zinc-800 p-3'>
			<div className='grid grid-cols-7 gap-4 mb-4 items-center'>
				<h1 className='col-span-1 font-bold text-3xl'>Student</h1>
				<Input
					className='col-span-2 py-2 rounded-md bg-transparent border border-zinc-800 pl-4'
					placeholder='Search'
				/>
				<Box
					sx={{ minWidth: 120 }}
					className='col-span-2'>
					<FormControl
						fullWidth
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
						}}>
						<InputLabel id='demo-simple-select-label'>Filter</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							label='Age'>
							<MenuItem value={10}>AR No.</MenuItem>
							<MenuItem value={20}>Program</MenuItem>
							<MenuItem value={30}>Academic Year</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<button className='col-span-2 flex gap-2 items-center place-content-center bg-gradient-to-tr from-[#025D59] to-[#59D896] text-white py-4 rounded-md'>
					Scan QR
					<AiOutlineScan />
				</button>
			</div>

			{/* Pagination */}

			{/* Table */}
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow
							sx={{
								"& .MuiTableCell-root": {
									color: "white",

									fontWeight: "bold",
								},
							}}>
							{[
								"AR No.",
								"Date",
								"Student ID",
								"Full Name",
								"Program",
								"Year",
								"Status",
								"Semester",
								"Amount",
								"Collector",
								"Action",
							]?.map((head, idx) => {
								return (
									<TableCell
										key={idx}
										className='border border-zinc-800 text-center'>
										{head}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{currentRows.map((payment, index) => (
							<TableRow
								key={index}
								sx={{
									"& .MuiTableCell-root": {
										color: "white",
										borderBottom: "1px solid #2C2C2C",
										backgroundColor: index % 2 === 0 ? "#1A1A1A" : "#0A0A0A",
										padding: "0.8rem 0 0.8rem 0.6rem",
										textAlign: "left",
									},
								}}>
								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									<p className='text-center'> {payment.ar_no}</p>
								</TableCell>
								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									{new Date(payment.created_at).toLocaleString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</TableCell>
								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									<p className='text-center'> {payment.student_id}</p>
								</TableCell>
								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									<p className='text-center'>
										{payment?.student?.first_name + " " + payment?.student?.last_name}
									</p>
								</TableCell>
								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									<p className='text-center'> {payment?.program?.program_name}</p>
								</TableCell>
								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									{payment.acad_year}
								</TableCell>

								<TableCell>
									<p
										className={`text-center rounded-md ${
											payment.desc === "full"
												? "text-[#1EF581] bg-[#2B3A29]"
												: "text-[#FFFB93] bg-[#3B3F27]"
										}`}>
										{payment.desc}
									</p>
								</TableCell>

								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									{payment?.semester?.semester_name}
								</TableCell>
								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									₱{payment.amount}
								</TableCell>
								<TableCell sx={{ color: "white", fontSize: "12px" }}>
									{payment?.collector?.first_name + " " + payment?.collector?.last_name}
								</TableCell>
								<TableCell>
									<button className='mr-4'>
										<BiEdit className='text-[#59D896]' />
									</button>
									<button>
										<BsTrash className='text-red-500' />
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Stack
				spacing={6}
				className='mt-6 flex place-items-end'>
				<Pagination
					sx={{
						"& .MuiPaginationItem-root": {
							color: "white",
						},
						"& .Mui-selected": {
							backgroundColor: "#59D896",
							color: "#025D59",
						},
						"& .MuiPaginationItem-root:hover": {
							backgroundColor: "#0A0A0A",
							color: "#59D896",
						},
						"& .MuiPaginationItem-outlined": {
							border: "1px solid #2C2C2C",
						},
						"& .MuiPaginationItem-page.Mui-selected": {
							backgroundColor: "#59D896",
							color: "#025D59",
						},
					}}
					variant='outlined'
					shape='rounded'
					color='secondary'
					count={Math.ceil(payments.length / rowsPerPage)}
					page={page}
					onChange={handleChange}
				/>
			</Stack>
		</div>
	);
};

export default PaymentsPagination;
