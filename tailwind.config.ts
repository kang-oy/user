import type { Config } from "tailwindcss";

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
      },
      fontFamily: {
        euclidCircularAFont: ['EuclidCircularA', 'sans-serif'],
        IBMPlexMonoRegular: ['IBMPlexMonoRegular', 'sans-serif'],
        IBMPlexMonoLight: ['IBMPlexMonoLight', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        lighter: '#4B5361',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
