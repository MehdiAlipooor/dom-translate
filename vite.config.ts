import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5176,
		strictPort: true, // fail if port is taken
		host: true, // listen on all interfaces (helps with firewall/localhost issues)
	},
});
