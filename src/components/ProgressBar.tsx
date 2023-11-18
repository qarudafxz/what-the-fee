import { FC } from "react";

type Props = {
	progress: string;
	steps: string;
};

export const ProgressBar: FC<Props> = ({ progress, steps }) => {
	return (
		<div className='pb-4'>
			{/* steps */}
			<p className='text-sm text-zinc-400 text-center pb-2'>{steps}</p>
			<div className='w-96 bg-dark py-1 rounded-full border border-zinc-800'>
				{/* line */}
				<div
					className={`h-1 bg-primary rounded-full py-2`}
					style={{
						width: `${progress}%`,
					}}
				/>
			</div>
		</div>
	);
};
