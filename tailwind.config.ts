// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: { 600: "#16A34A" }, // Force hex
      },
    },
  },
  corePlugins: {
    // DISABLE lab() output
    preflight: true,
  },
  plugins: [],
  // ADD THIS: Force rgb() output
  future: {
    hoverOnlyWhenSupported: true,
  },
  // ADD THIS: Critical fix
  safelist: [
    { pattern: /./ } // Keep all classes
  ],
};

export default config;