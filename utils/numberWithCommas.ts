export const numberWithCommas = (amount: string) => {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
