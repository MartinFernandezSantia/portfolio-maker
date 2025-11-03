import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
      },
      boxShadow: {
        glow: "var(--glow)",
      },
      // colors: {
      //     'gradient-primary': 'var(--gradient-primary)',
      //     'gradient-secondary': 'var(--gradient-secondary)',
      //     'glow': 'var(--glow)',
      // },
    },
  },
  plugins: [],
} satisfies Config;
