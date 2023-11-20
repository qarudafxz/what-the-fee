/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
} from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";

interface Admin {
	permit_admin_id: string;
	first_name: string;
	last_name: string;
	email: string;
	can_add: boolean;
	can_delete: boolean;
	can_update: boolean;
	admin_id: string;
}

interface AdminPrivilegesProps {
	permissions: Admin[];
}

const AdminPrivileges: React.FC<AdminPrivilegesProps> = ({ permissions }) => {
	const [isUpdatePermission, setIsUpdatePermission] = useState(false);
	const [isDeletePermission, setIsDeletePermission] = useState(false);
	const [canUpdate, setCanUpdate] = useState<boolean>(false);
	const [canDelete, setCanDelete] = useState<boolean>(false);
	const [adminId, setAdminId] = useState<string>("");
	const { getItem } = useLocalStorage();
	const { getSession } = useGetSession();
	const token = getItem("token");
	const admin_id = getSession("student_id");

	const memoizedUpdatePermission = useCallback(async () => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		};

		try {
			await axios
				.put(
					`http://localhost:8000/api/can-update-permission/${adminId}`,
					{
						can_update: canUpdate,
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
						setIsUpdatePermission(false);
					} else {
						toast.error(data.message, {
							autoClose: 2000,
							theme: "dark",
						});
					}
				});
		} catch (err) {
			console.error("Error updating permission:", err);
			throw new Error("Error updating permission.");
		} finally {
			setIsUpdatePermission(false);
		}
	}, [canUpdate, token, adminId, admin_id]);

	const memoizedDeletePermssion = useCallback(async () => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		};

		try {
			await axios
				.put(
					`http://localhost:8000/api/can-delete-permission/${adminId}`,
					{
						can_delete: canDelete,
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
						setIsUpdatePermission(false);
					} else {
						toast.error(data.message, {
							autoClose: 2000,
							theme: "dark",
						});
					}
				});
		} catch (err) {
			console.error("Error updating permission:", err);
			throw new Error("Error updating permission.");
		} finally {
			setIsUpdatePermission(false);
		}
	}, [canUpdate, token, adminId, admin_id]);

	useEffect(() => {
		if (isUpdatePermission) {
			//axios update
			memoizedUpdatePermission();
		}
	}, [isUpdatePermission]);

	useEffect(() => {
		if (isDeletePermission) {
			//axios update
			memoizedDeletePermssion();
		}
	}, [isDeletePermission]);

	console.log(permissions);

	return (
		<div className='font-main bg-[#131313] rounded-2xl border border-zinc-700 p-2 col-span-2'>
			{/* Header */}
			<ToastContainer />
			<div className='flex justify-between items-center'>
				<h1 className='text-white font-bold text-2xl'>People with Access</h1>
			</div>
			{/* Admin List mapped */}
			<div className='flex flex-col mt-6 max-h-[400px] overflow-y-auto custom'>
				{permissions?.map((admin, idx) => {
					return (
						<div
							key={idx}
							className='p-3 bg-white border border-zinc-500 flex justify-between'>
							<div className='flex gap-6 items-center'>
								<FaRegUser
									size={60}
									className='bg-gradient-to-br from-zinc-700 to-zinc-950 rounded-full p-4 text-primary'
								/>
								<div className='text-zinc-950'>
									<h1 className='font-bold text-zinc-800 text-xl'>
										{admin?.first_name + " " + admin?.last_name}
									</h1>
									<p className='text-xs mb-1'>{admin?.email}</p>
									<div className='flex space-x-2 items-center text-sm'>
										{admin?.can_add && (
											<div className='bg-green-500 text-green-950 px-2 py-1 rounded-md flex gap-2 items-center'>
												<FaPlus />
												Can add
											</div>
										)}
										{admin?.can_update && (
											<div className='bg-yellow-500 text-yellow-950 e px-2 py-1 rounded-md flex gap-2 items-center'>
												<CiEdit />
												Can edit
											</div>
										)}
										{admin?.can_delete && (
											<div className='bg-red-500 text-red-950  px-2 py-1 rounded-md flex gap-2 items-center'>
												<MdDelete />
												Can delete
											</div>
										)}
									</div>
								</div>
							</div>
							<Popover>
								<PopoverTrigger>
									<Button className='font-bold text-md'>
										<HiDotsHorizontal />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									position={"relative"}
									top={"-40px"}>
									<div className='flex flex-col gap-2 bg-[#0F0F0F] px-2 py-1 rounded-md border border-zinc-600'>
										<button
											onClick={() => {
												setAdminId(admin?.permit_admin_id);
												setCanUpdate(!admin?.can_update);
												setIsUpdatePermission(true);
											}}
											className='flex gap-2 items-center text-xs text-zinc-600 font-bold py-2'>
											Can Update {admin?.can_update && <IoMdCheckmark size={15} />}
										</button>
										<button
											onClick={() => {
												setAdminId(admin?.permit_admin_id);
												setCanDelete(!admin?.can_delete);
												setIsDeletePermission(true);
											}}
											className='flex gap-2 items-center text-xs text-zinc-600 font-bold border-t border-zinc-600 py-2'>
											Can Delete {admin?.can_delete && <IoMdCheckmark size={15} />}
										</button>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AdminPrivileges;
