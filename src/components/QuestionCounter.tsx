import { FC, useState, useEffect } from "react";

interface Props {
	length: number;
	text: string;
}

export const QuestionCounter: FC<Props> = (text) => {
	const maximumText = 50;
	const [counter, setCounter] = useState<number>(maximumText);

	useEffect(() => {
		const currentTextCount = maximumText - text.text.length;

		if (currentTextCount > -1) {
			setCounter(currentTextCount);
		}
	}, [text]);
	return (
		<div className='bg-[#252525] border border-[#434242] p-2 rounded-md'>
			<p
				className={`${
					counter > 35
						? "text-white"
						: counter > 20
						? "text-yellow-400"
						: "text-red-400"
				}`}>
				{counter}
			</p>
		</div>
	);
};
