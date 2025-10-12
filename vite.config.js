import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: {
        manifest: true,
        rollupOptions: {
            input: "app/layout.js",
            makeAbsoluteExternalsRelative: true,
            jsx: true
        },
    },
});
