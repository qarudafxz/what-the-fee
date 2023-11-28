import React from "react";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
	admin_id: string;
	request_id: number;
	request_type: string;
	first_name: string;
	last_name: string;
	ar_no: string;
	desc: string;
	created_at: string;
	value_of_request?: string;
	is_approved?: boolean;
	email: string;
}

const ViewRequest: React.FC<{
	viewedRequest: Props;
	getRequests: () => void;
}> = ({ viewedRequest, getRequests }) => {
	const { getItem } = useLocalStorage();
	const token = getItem("token");
	const { getSession } = useGetSession();
	const admin_id = getSession("student_id");

	const grantRequest = async (request_id: number) => {
		//axios update

		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		};

		try {
			await axios
				.post(
					`http://localhost:8000/api/grant-request/${request_id}`,
					{
						request_id: viewedRequest?.request_id,
						request_type: viewedRequest?.request_type,
						first_name: viewedRequest?.first_name,
						last_name: viewedRequest?.last_name,
						ar_no: viewedRequest?.ar_no,
						desc: viewedRequest?.desc,
						created_at: viewedRequest?.created_at,
						value_of_request: viewedRequest?.value_of_request,
						email: viewedRequest?.email,
					},
					{ headers }
				)
				.then(async (res) => {
					const data = await res.data;
					if (!data.error) {
						toast.success(data.message, {
							autoClose: 2000,
							theme: "dark",
						});
						getRequests();
						return;
					}

					toast.error(data.message, {
						autoClose: 2000,
						theme: "dark",
					});
				});
		} catch (err) {
			console.log(err);
			throw new Error("Error granting request");
		}
	};

	const declineRequest = async (request_id: number) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		};

		try {
			await axios
				.post(
					`http://localhost:8000/api/decline-request/${request_id}`,
					{
						request_id: viewedRequest?.request_id,
						request_type: viewedRequest?.request_type,
						request_admin_id: viewedRequest?.admin_id,
						first_name: viewedRequest?.first_name,
						last_name: viewedRequest?.last_name,
						ar_no: viewedRequest?.ar_no,
						desc: viewedRequest?.desc,
						created_at: viewedRequest?.created_at,
						value_of_request: viewedRequest?.value_of_request,
						email: viewedRequest?.email,
					},
					{ headers }
				)
				.then(async (res) => {
					const data = await res.data;
					if (!data.error) {
						toast.success(data.message, {
							autoClose: 2000,
							theme: "dark",
						});
						return;
					}

					toast.error(data.message, {
						autoClose: 2000,
						theme: "dark",
					});
				});
		} catch (err) {
			console.log(err);
			throw new Error("Error granting request");
		}
	};

	return (
		<div className='col-span-1'>
			<ToastContainer />
			<div className='bg-[#0F0F0F] h-full border border-zinc-600 rounded-md'>
				{Object.keys(viewedRequest).length === 0 &&
				viewedRequest.constructor === Object ? (
					<div className='grid items-center place-items-center h-full'>
						<h1 className='font-bold text-xl text-zinc-700'>No Request Viewed</h1>
					</div>
				) : (
					<div className='p-8 flex flex-col gap-7'>
						<div className='flex gap-5 items-center'>
							<FaRegUser
								size={50}
								className='bg-gradient-to-br from-zinc-600 to-zinc-900 rounded-full text-primary p-3'
							/>
							<div className='flex flex-col'>
								<h1 className='font-bold text-xl text-zinc-300'>
									{viewedRequest?.first_name + " " + viewedRequest?.last_name}
								</h1>
								<h1 className='text-xs text-zinc-400'>{viewedRequest?.email}</h1>
							</div>
						</div>
						<div className='flex gap-5 items-center'>
							<h1 className='text-zinc-400 bg-zinc-800 px-2 py-1 rounded-md border border-zinc-400'>
								{viewedRequest?.ar_no}
							</h1>
							<h1
								className={`font-bold text-xl ${
									viewedRequest?.request_type === "DELETE"
										? "text-red-600"
										: "text-yellow-600"
								}`}>
								{viewedRequest?.request_type}
							</h1>
							<h1 className='text-xs text-zinc-400'>
								{new Date(viewedRequest?.created_at).toLocaleDateString("en-US", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</h1>
						</div>
						<h1 className='bg-zinc-900 p-4 rounded-md text-sm text-white'>
							{viewedRequest?.desc}
						</h1>
						<div className='flex flex-col gap-2 place-content-center relative mt-28'>
							<button
								onClick={() => grantRequest(viewedRequest?.request_id)}
								className='bg-primary text-green-700 py-2 rounded-md text-lg font-bold'>
								Accept
							</button>
							<button
								onClick={() => declineRequest(viewedRequest?.request_id)}
								className='text-primary border border-primary py-2 rounded-md text-lg font-bold'>
								Decline
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ViewRequest;
