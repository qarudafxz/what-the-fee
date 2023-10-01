import { useState, useEffect } from "react";

export const useCounter = (target: number, delay: number) => {
	const [counter, setCounter] = useState(0);
	let timeoutId: NodeJS.Timeout;

	useEffect(() => {
		let count = 0;
		const increment = 75;

		const updateCount = () => {
			if (count < target) {
				const rem = Math.ceil((target - count) / increment);
				count += rem;
				setCounter(count);
				// eslint-disable-next-line react-hooks/exhaustive-deps
				timeoutId = setTimeout(updateCount, delay);
			}
		};

		updateCount();
		return () => clearTimeout(timeoutId);
	}, [target, delay]);

	return counter;
};
