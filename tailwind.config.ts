import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/shared/**/*.{ts,tsx,js,jsx}',
    './src/widgets/**/*.{ts,tsx,js,jsx}',
    './src/features/**/*.{ts,tsx,js,jsx}',
    './src/entities/**/*.{ts,tsx,js,jsx}',
  ],
  plugins: [],
};

export default config;
