import linaria from "@wyw-in-js/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    linaria({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
});
