export const sliceNan = (arr: number[]): number[] => {
	for (let i = 0; i < arr.length; i++) {
		if (isNaN(arr[i])) {
			arr.splice(i, 1);
		}
	}
	return arr;
};
