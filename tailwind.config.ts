import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { brand: "#e65f1a", ink: "#17191d" }, fontFamily: { sans: ["Arial", "sans-serif"] } } }, plugins: [] };
export default config;
