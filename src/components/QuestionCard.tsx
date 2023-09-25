import { FC, useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { QuestionCounter } from "./QuestionCounter";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";

interface Props {
	setError: (error: boolean) => void;
}

type Verification = {
	question: string;
	answer: string;
};

export const QuestionCard: FC<Props> = ({ setError }) => {
	const [questions, setQuestions] = useState<Array<Verification>>([]);
	const [question, setQuestion] = useState<string>("");
	const [answer, setAnswer] = useState<string>("");
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const circlePagination = Array.from({ length: 5 }, (_, index) => {
		return (
			<div
				key={index}
				className={`w-3 h-3 rounded-full ${
					index === activeIndex ? "bg-primary" : "bg-zinc-700"
				}`}
			/>
		);
	});

	const handleNewQuestion = () => {
		if (!question || !answer) {
			setError(true);
			return;
		}

		setQuestions((prevQuestions) => [
			...prevQuestions,
			{ question: question, answer: answer },
		]);

		if (activeIndex < 5) {
			setActiveIndex(activeIndex + 1);
		}

		console.log(questions);

		setQuestion("");
		setAnswer("");
	};

	return (
		<div className='font-main'>
			<div className='flex flex-col gap-4 bg-dark p-4 text-white border border-zinc-600 rounded-md shadow-2xl'>
				<h1 className='font-bold text-2xl'>For Verification</h1>

				<div className='flex flex-col gap-1'>
					<div className='relative w-full'>
						<Textarea
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							placeholder='Type your question'
							className='w-96 h-24 pl-2 py-4 rounded-md border border-zinc-700 bg-transparent text-xs resize-none'
						/>
						<div className='absolute bottom-4 left-[340px]'>
							<QuestionCounter
								text={question}
								length={0}
							/>
						</div>
					</div>
					<div className='relative w-full'>
						<Textarea
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							placeholder='Type your answer'
							className='w-96 h-18 pl-2 py-4 rounded-md border border-zinc-700 bg-transparent text-xs resize-none'
						/>
						<div className='absolute bottom-4 left-[340px]'>
							<QuestionCounter
								text={answer}
								length={0}
							/>
						</div>
					</div>
					<div className='flex justify-between items-center'>
						<div className='flex flex-row gap-4'>{circlePagination}</div>
						<button onClick={handleNewQuestion}>
							{activeIndex === 4 ? (
								<div className='flex gap-2 items-center bg-primary text-secondary py-2 px-4 rounded-md font-semibold'>
									<h1>Confirm</h1>
									<FiArrowUpRight size={20} />
								</div>
							) : (
								<AiOutlineArrowRight
									size={40}
									className='bg-gradient-to-br from-secondary to-primary rounded-full p-2'
								/>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
