/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xxxxs: "260px",
				xxxs: "320px",
				xxs: "375px",
				xs: "425px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},
			backgroundColor: {
				primary: "#5CE199",
				secondary: "#D3EFA5",
				gradient: "linear-gradient(180deg, #5CE199 0%, #D3EFA5 100%)",
			},
		},
	},
	plugins: [],
};
