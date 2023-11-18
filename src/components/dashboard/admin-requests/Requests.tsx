/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { FaRegUser } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
} from "@chakra-ui/react";

interface Request {
	request_id: number;
	first_name: string;
	last_name: string;
	email: string;
	desc: string;
	request_type: string;
	created_at: string;
}

const Requests: React.FC<{
	requests: Request[];
	loading: boolean;
	setSelectedRequestId: React.Dispatch<React.SetStateAction<number>>;
	setIsView: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ requests, loading, setSelectedRequestId, setIsView }) => {
	return (
		<div className='col-span-2'>
			<div className='flex flex-col gap-4 px-4 py-5 bg-[#0F0F0F]  opacity-90 rounded-md border border-zinc-600'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-2xl text-zinc-500'>Requests</h1>
					<button className='bg-primary px-3 py-2 rounded-md text-md font-bold'>
						Clear All
					</button>
				</div>
				<div className='flex flex-col gap-2 max-h-[410px] overflow-y-auto custom mt-4'>
					{requests?.length === 0 ? (
						<div className='flex justify-center items-center h-[450px]'>
							<h1 className='font-bold text-4xl text-zinc-600'>No requests</h1>
						</div>
					) : (
						requests?.map((request: any) => {
							return loading ? (
								<Skeleton
									variant='rectangular'
									width={655}
									height={60}
								/>
							) : (
								<div
									key={request?.request_id}
									className='flex justify-between bg-white px-4 py-2 items-center max-h-[410px]'>
									<div className='flex gap-4 items-center'>
										<FaRegUser
											size={50}
											className='bg-gradient-to-br from-zinc-700 to-zinc-900 text-primary rounded-full p-3'
										/>
										<div className=''>
											<h1 className='font-bold text-lg text-zinc-500'>
												{request?.first_name + " " + request?.last_name}
											</h1>
											<p className='text-sm text-zinc-500'>{request?.email}</p>
											<div className='flex gap-2 items-center'>
												<p className='text-sm text-zinc-600 bg-zinc-400 rounded-md px-2 py-1 font-bold'>
													{request?.desc}
												</p>
												<p
													className={`text-sm font-semibold px-2 py-1 rounded-md border ${
														request?.request_type === "DELETE"
															? "bg-red-500 text-red-700 border-red-700"
															: "bg-yellow-500 text-yellow-700 border-yellow-700"
													}`}>
													{request?.request_type}
												</p>
												<p className='text-sm text-zinc-600'>
													Requested on{" "}
													{new Date(request?.created_at).toLocaleDateString("en-US", {
														month: "long",
														day: "2-digit",
														year: "numeric",
														hour: "numeric",
														minute: "numeric",
														hour12: true,
													})}
												</p>
											</div>
										</div>
									</div>
									<Popover>
										<PopoverTrigger>
											<Button>
												<HiDotsHorizontal
													size={25}
													className='text-zinc-500 cursor-pointer'
												/>
											</Button>
										</PopoverTrigger>
										<PopoverContent>
											<button
												onClick={() => {
													setSelectedRequestId(request?.request_id);
													setIsView(true);
												}}
												className='bg-zinc-800 px-2 py-1 rounded-md text-zinc-400 border border-zinc-400 text-sm font-bold'>
												View
											</button>
										</PopoverContent>
									</Popover>
								</div>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default Requests;
