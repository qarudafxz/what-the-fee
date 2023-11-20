/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import logo from "../../../assets/logo_only.png";
import { Input } from "@chakra-ui/react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

type PaymentsProps = {
	ar_no: string;
	date: Date;
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

const PaymentsPagination: FC<{
	payments?: PaymentsProps[];
	filterPayments: any;
}> = ({ payments, filterPayments }) => {
	const { getItem } = useLocalStorage();
	const { getSession } = useGetSession();
	const token = getItem("token");
	const admin_id = getSession("student_id");
	const [page, setPage] = useState(1);
	const [value, setValue] = useState("");
	const [type, setType] = useState("");
	const [isDelete, setIsDelete] = useState(false);
	const rowsPerPage = 7;

	//for action data
	const [selectedArNum, setSelectedNum] = useState("");
	// const [desc, setDesc] = useState("");
	// const [valueOfRequest, setValueOfRequest] = useState("");

	const action = async (
		e: React.MouseEvent<HTMLButtonElement>,
		ar_no?: string,
		type?: string
	) => {
		e.preventDefault();

		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		};

		try {
			const response = await axios.post(
				"http://localhost:8000/api/create-request",
				{
					admin_id: admin_id,
					ar_no: ar_no,
					request_type: type,
					desc: "asd",
					value_of_request: "0",
				},
				{ headers }
			);

			const data = response.data;
			console.log(data);

			if (data.error) {
				toast.error(data.message, {
					autoClose: 2000,
					theme: "dark",
				});
			} else {
				toast.success(data.message, {
					autoClose: 5000,
					theme: "dark",
				});
			}
		} catch (err) {
			throw new Error("Error handling action");
		} finally {
			setIsDelete(false);
		}
	};

	const ConfirmDelete = () => {
		return (
			<>
				{isDelete && (
					<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
						<motion.form
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{
								duration: 0.8,
								type: "spring",
								ease: [0, 0.71, 0.2, 0],
							}}
							className='flex flex-col gap-4 p-10 w-5/12 bg-black absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl rounded-md border-t-8 border-[#49B0AD]'>
							<div className='my-8 grid place-items-center text-center justify-center'>
								<img
									src={logo}
									alt='logo'
									className='w-20 h-20'
								/>
								<p className='text-white font-bold text-4xl mt-16 px-24'>
									Are you sure you want to delete {selectedArNum} record?
								</p>
								<div className='flex gap-3 items-center mt-6'>
									<button
										onClick={(e) => action(e, selectedArNum, "DELETE")}
										className='bg-[#49B0AD] px-6 text-white font-bold text-xl py-2 rounded-md'>
										Yes
									</button>
									<button
										onClick={() => {
											setIsDelete!(false);
										}}
										className='border border-[#49B0AD] px-6 text-[#49B0AD] font-bold text-xl py-2 rounded-md'>
										No
									</button>
								</div>
							</div>
						</motion.form>
					</div>
				)}
			</>
		);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const indexOfLastRow = page * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;
	const currentRows = payments!.slice(indexOfFirstRow, indexOfLastRow);

	return (
		<div className='text-white font-main bg-[#131313] opacity-90 w-full flex flex-col gap-2 rounded-md border border-zinc-800 p-3  h-[580px]'>
			<ToastContainer />
			<div className='grid grid-cols-8 space-x-6 mb-4 items-center'>
				<h1 className='col-span-1 font-bold text-3xl'>Student</h1>
				<Input
					onChange={(e) => setValue(e.target.value)}
					className='col-span-4 py-4 rounded-md bg-transparent border border-zinc-800 pl-4'
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
							//extract the value of the selected option
							onChange={(e) => setType(e.target.value! as string)}
							label='Filter'>
							<MenuItem value='student_id'>Student ID</MenuItem>
							<MenuItem value='ar_no'>AR No.</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<button
					onClick={() => filterPayments(type, value, setValue)}
					className='bg-zinc-800 py-4 rounded-md font-bold'>
					Search
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
									{new Date(payment.date).toLocaleString("en-US", {
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
									<button
										// onClick={(e) => action(e, payment?.ar_no, "update")}
										className='mr-4'>
										<BiEdit className='text-[#59D896]' />
									</button>
									<button
										onClick={() => {
											setSelectedNum(payment?.ar_no);
											setIsDelete(true);
										}}>
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
				className='mt-6 flex place-items-end fixed bottom-6 right-[235px]'>
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
					count={Math.ceil(payments!.length / rowsPerPage)}
					page={page}
					onChange={handleChange}
				/>
			</Stack>
			<ConfirmDelete />
		</div>
	);
};

export default PaymentsPagination;
