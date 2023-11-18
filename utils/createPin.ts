export const createPin = (): Array<number> => {
	const code = [];
	for (let i = 0; i < 4; i++) {
		const pin = Math.floor(Math.random() * 10);
		code.push(pin);
	}

	return code;
};
