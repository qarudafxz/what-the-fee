import { FC, useState, useEffect, useMemo } from "react";
import { FaRegUser } from "react-icons/fa";
import { useGetSession } from "../../../../hooks/useGetSession";
import Skeleton from "@mui/material/Skeleton";

type Admin = {
	admin_id: string;
	email: string;
	first_name: string;
	last_name: string;
	role: string;
};

export const AdminList: FC = () => {
	const { getSession } = useGetSession();
	const college_id = getSession("college_id");
	const [loading, setLoading] = useState<boolean>(false);
	const [admins, setAdmins] = useState<Admin[]>([]);

	const getAdmins = async (): Promise<void> => {
		try {
			setLoading(true);
			await fetch(`http://localhost:8000/api/get-admin/${college_id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}).then(async (res) => {
				const data = await res.json();
				setAdmins(data.admins);
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const cachedAdmins = useMemo(() => admins, [admins]);

	useEffect(() => {
		if (!cachedAdmins || cachedAdmins.length === 0) {
			getAdmins();
		}
	}, [cachedAdmins]);

	return (
		<div className='bg-[#0F0F0F] p-4 border border-zinc-800 rounded-md'>
			<h1 className='text-white font-bold text-xl mb-4'>List of Admins</h1>
			<div className='flex flex-col gap-6'>
				{cachedAdmins?.map((admin, idx) => {
					return (
						<div
							key={idx}
							className='flex justify-between items-center'>
							<div className='flex gap-2 items-center'>
								{loading ? (
									<Skeleton
										variant='circular'
										width={40}
										height={40}
									/>
								) : (
									<FaRegUser
										size={40}
										className='bg-gradient-to-tr from-secondary to-primary rounded-full border border-primary p-2 text-[#9dffcc]'
									/>
								)}
								<div className='flex flex-col'>
									{loading ? (
										<Skeleton
											variant='text'
											width={250}
											height={50}
										/>
									) : (
										<h1 className='text-white font-bold text-2xl'>
											{admin.first_name + " " + admin.last_name}
										</h1>
									)}
									<div className='flex gap-2 items-center'>
										{loading ? (
											<Skeleton
												variant='text'
												width={200}
												height={20}
											/>
										) : (
											<p className='text-zinc-500 font-thin text-xs'>{admin.email}</p>
										)}
										{loading ? (
											<Skeleton
												variant='text'
												width={40}
												height={20}
											/>
										) : (
											<p className='text-zinc-700 font-thin text-xs'>({admin.role})</p>
										)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
