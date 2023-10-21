import { FC, useState } from "react";
import { Button } from "@chakra-ui/react";
import { LuScanLine } from "react-icons/lu";
import { useGetSession } from "../../../../hooks/useGetSession";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentQrScanner from "./PaymentQrScanner";

export const Payment: FC<{ ar_no: string }> = ({ ar_no }) => {
	const { getSession } = useGetSession();
	const admin_id = getSession("student_id");
	const [date, setDate] = useState("");
	const [studentID, setStudentID] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [program, setProgram] = useState(null);
	const [year, setYear] = useState(0);
	const [acadYear, setAcadYear] = useState("2023-2024");
	const [semester, setSemester] = useState("1");
	const [amount, setAmount] = useState("");
	const [arNo, setArNo] = useState("");
	const [isQrScan, setIsQrScan] = useState(false);

	const handleSearchStudent = async (): Promise<void> => {
		try {
			if (studentID) {
				await fetch(`http://localhost:8000/api/search-student/${studentID}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${admin_id}`,
					},
				}).then(async (res) => {
					const data = await res.json();
					toast.success("Student found.", {
						autoClose: 2000,
						theme: "dark",
					});
					setStudentID(data.student.student_id);
					setFirstName(data.student.first_name);
					setLastName(data.student.last_name);
					setYear(data.student.year_level_code);
					setProgram(data.student.program.program_id);
				});
			}
		} catch (error) {
			toast.error("Student not found.", {
				autoClose: 2000,
				theme: "dark",
			});
			console.log(error);
		}
	};

	const handleAddPayment = async (): Promise<void> => {
		const parsedAmount = parseInt(amount);
		const parsedSemester = parseInt(semester);
		const data = {
			date,
			ar_no: arNo,
			amount: parsedAmount,
			student_id: studentID,
			admin_id: admin_id,
			semester_id: parsedSemester,
			acad_year: acadYear,
			desc: "partial",
		};

		try {
			await fetch("http://localhost:8000/api/add-payment/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${admin_id}`,
				},
				body: JSON.stringify(data),
			}).then(async (res) => {
				const data = await res.json();
				if (data.statusCode !== 400 || data.status !== "failed") {
					console.log(data);
					toast.success("Payment added.", {
						autoClose: 2000,
						theme: "dark",
					});
				} else {
					toast.error(data.message, {
						autoClose: 2000,
						theme: "dark",
					});
					return;
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='font-main bg-[#0F0F0F] opacity-90 rounded-md border border-zinc-600 ml-64 mr-56 p-4 relative bottom-20'>
			<ToastContainer />
			<div className='flex justify-between'>
				<h1 className='font-bold text-white text-3xl pb-8'>Payment Details</h1>
				<h1 className='text-white'>
					Last AR Number: <span className='text-primary'>{ar_no}</span>
				</h1>
			</div>
			<div className='grid grid-cols-6 text-primary gap-x-4'>
				<div className='col-span-3 flex flex-col'>
					<p className='font-semibold'>Date</p>
					<input
						type='date'
						placeholder='Date'
						onChange={(e) => setDate(e.target.value)}
						className='bg-transparent p-3 rounded-md border border-primary mt-4'
					/>
				</div>
				<div className='col-span-1 flex flex-col'>
					<p className='font-semibold'>ID Number</p>
					<input
						type='text'
						onChange={(e) => setStudentID(e.target.value)}
						className='bg-transparent p-3 rounded-md border border-primary mt-4'
					/>
				</div>
				<button
					onClick={() => handleSearchStudent()}
					className='bg-zinc-900 text-white py-4 rounded-md'>
					Search
				</button>
				<Button
					size='xs'
					onClick={() => setIsQrScan(true)}
					className='bg-[#59D896] text-[#268454] font-bold rounded-md py-8 flex flex-col gap-2'>
					<LuScanLine size={50} />
					Scan ID
				</Button>
			</div>
			{/* Names */}
			<div className='grid grid-cols-9 gap-2'>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>First name</h1>
					<input
						type='text'
						value={firstName}
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>

				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Last name</h1>
					<input
						type='text'
						value={lastName}
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Program</h1>
					<select
						value={program!}
						className='bg-transparent border border-primary rounded-md pl-2 py-2'>
						<option value={1}>BSIT</option>
						<option value={2}>BSIS</option>
						<option value={3}>BSCS</option>
					</select>
				</div>
			</div>
			{/*  year, semester */}
			<div className='grid grid-cols-9 gap-2 mt-6'>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Year</h1>
					<input
						type='text'
						value={
							year === 1
								? "First Year"
								: year === 2
								? "Second Year"
								: year === 3
								? "Third Year"
								: year === 4
								? "Fourth Year"
								: ""
						}
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Semester</h1>
					<select
						onChange={(e) => setSemester(e.target.value)}
						className='bg-transparent border border-primary rounded-md pl-2 py-2'>
						<option
							value={1}
							selected>
							First Semester
						</option>
						<option value={2}>Second Semester</option>
					</select>
				</div>
				<div className='col-span-3 flex flex-col gap-2 text-primary'>
					<h1>Academic Year</h1>
					<select
						onChange={(e) => {
							setAcadYear(e.target.value);
						}}
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'>
						<option
							value='2023-2024'
							selected>
							2023-2024
						</option>
						<option value='2024-2025'>2024-2025</option>
						<option value='2025-2026'>2025-2026</option>
					</select>
				</div>
			</div>
			{/* Ar Number, Amount, Status */}
			<div className='grid grid-cols-10 gap-2 mt-6'>
				<div className='col-span-5 flex flex-col gap-2 text-primary'>
					<h1>AR Number</h1>
					<input
						onChange={(e) => setArNo(e.target.value)}
						type='text'
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
				<div className='col-span-5 flex flex-col gap-2 text-primary'>
					<h1>Amount</h1>
					<input
						type='text'
						onChange={(e) => setAmount(e.target.value)}
						className=' bg-transparent border border-primary rounded-md pl-2 py-2'
					/>
				</div>
			</div>
			<button
				onClick={handleAddPayment}
				className='w-full py-2 font-bold text-white text-center rounded-md bg-primary mt-4'>
				Add Payment
			</button>
			<PaymentQrScanner
				setIsQrScanner={setIsQrScan}
				isQrScanner={isQrScan}
				handleStudentSearch={handleSearchStudent}
				setStudentID={setStudentID}
				studentID={studentID}
			/>
		</div>
	);
};
