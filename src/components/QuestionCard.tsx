import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@chakra-ui/react";
import { QuestionCounter } from "./QuestionCounter";
import { AiOutlineArrowRight, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
import { useGetSession } from "../../hooks/useGetSession";
import { motion } from "framer-motion";

type Verification = {
	question: string;
	answer: string;
};

export const QuestionCard: FC = () => {
	const navigate = useNavigate();
	const { getSession } = useGetSession();
	const token = getSession("session");
	const [questions, setQuestions] = useState<Array<Verification>>([]);
	const [question, setQuestion] = useState<string>("");
	const [answer, setAnswer] = useState<string>("");
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	const circlePagination = Array.from({ length: 6 }, (_, index) => {
		return (
			index != 0 && (
				<div
					key={index}
					className={`w-3 h-3 rounded-full ${
						index === activeIndex ? "bg-primary" : "bg-zinc-700"
					}`}
				/>
			)
		);
	});

	const startInputQuestion = () => {
		setActiveIndex(1);
	};

	const handleNewQuestion = () => {
		if (activeIndex < 5 || activeIndex != 0) {
			setActiveIndex(activeIndex + 1);
			//move to the second index of setQuestions and add the question and answer
			setQuestions([
				...questions,
				{
					question: question,
					answer: answer,
				},
			]);
			setQuestion("");
			setAnswer("");
		}
	};

	const submitQuestions = async () => {
		console.log(questions);
		setLoading(true);
		await fetch("http://localhost:8080/api/auth/add-questions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				session: `${token}`,
			},
			body: JSON.stringify({
				student_id: getSession("student_id"),
				questions: questions,
			}),
		}).then(async (res) => {
			if (res.status === 200 || res.ok) {
				setTimeout(() => {
					setLoading(false);
					navigate("/verify-email");
				}, 4000);
			}
		});
	};

	return (
		<div className='font-main'>
			<div className='flex flex-col gap-4 bg-dark p-4 text-white border border-zinc-600 rounded-md shadow-2xl'>
				<h1 className='font-bold text-2xl'>For Verification</h1>
				<div className='flex flex-col gap-1'>
					{/* Inputs */}
					{activeIndex === 0 ? (
						<p className='w-96 text-xs text-zinc-400'>
							This stage is for the collection of questions and answers from the newly
							created account for security purposes. All of these are remain
							confidential and only the person responsible can acquire the information
							inputted
						</p>
					) : (
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
						</div>
					)}
					<div className='flex justify-between items-center mt-4'>
						<div className='flex flex-row gap-4'>{circlePagination}</div>
						{activeIndex === 0 && (
							<button onClick={startInputQuestion}>
								<div className='flex gap-2 items-center bg-primary text-secondary py-2 px-4 rounded-md font-semibold'>
									<h1>Start</h1>
								</div>
							</button>
						)}
						{activeIndex > 0 && activeIndex < 5 && (
							<button onClick={handleNewQuestion}>
								<AiOutlineArrowRight
									size={40}
									className='bg-gradient-to-br from-secondary to-primary rounded-full p-2'
								/>
							</button>
						)}
						{activeIndex === 5 && (
							<button onClick={submitQuestions}>
								<div className='flex gap-2 items-center bg-primary text-secondary py-2 px-4 rounded-md font-semibold'>
									<h1>Confirm</h1>
									{loading ? (
										<span className='flex gap-4 items-center text-dark'>
											<motion.div
												animate={{
													rotate: 360,
												}}
												transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}>
												<AiOutlineLoading3Quarters size={16} />
											</motion.div>
										</span>
									) : (
										<FiArrowUpRight />
									)}
								</div>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
