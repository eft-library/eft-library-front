/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./@/**/*.{ts,tsx}",
  ],
  safelist: [
    { pattern: /^grid-cols-\d+$/ },
    { pattern: /^col-span-\d+$/ },
    // text-color classes
    {
      pattern:
        /text-(CloudGray|DeepSlate|PeachCream|SkyBloom|NeutralGray|MidnightBlack|GoldenYellow|SunsetYellow|CreamYellow|LightYellow|SoftPink|BrightCyan|Red|PaleYellow|VividGreen|ForestGreen|AmberGold|WalnutBrown|ChestnutBrown|DeepBurgundy|DarkMahogany|LightOrange|Orange|Beige|SoftRed|SkyBlue|Goldenrod|MutedGray|Background)/,
    },

    // hover:text-color classes
    {
      pattern:
        /hover:text-(CloudGray|DeepSlate|NeutralGray|MidnightBlack|GoldenYellow|SunsetYellow|CreamYellow|LightYellow|SoftPink|BrightCyan|Red|PaleYellow|VividGreen|ForestGreen|AmberGold|WalnutBrown|ChestnutBrown|DeepBurgundy|DarkMahogany|LightOrange|Orange|Beige|SoftRed|SkyBlue|Goldenrod|MutedGray|Background)/,
    },
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))", // 13등분
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        NeutralGray: "#626262",
        MidnightBlack: "#191D27",
        GoldenYellow: "#ffd700",
        SunsetYellow: "#FFC368",
        CreamYellow: "#FFE1B5",
        LightYellow: "#ffe6a7",
        SoftPink: "#ff7a7a",
        BrightCyan: "#00E0FF",
        Red: "#FF0000",
        NeonOrange: "#FF4500",
        PaleYellow: "#FDFFA7",
        VividGreen: "#3DBA00",
        ForestGreen: "#2E6D0F",
        AmberGold: "#DE8E13",
        WalnutBrown: "#694F27",
        ChestnutBrown: "#86552D",
        DeepBurgundy: "#831C16",
        DarkMahogany: "#5B0803",
        LightOrange: "#ffa843",
        Orange: "#FFA34E",
        Beige: "#EFBE85",
        SoftRed: "#ff7676",
        SkyBlue: "#3586ff",
        Goldenrod: "#d2b82e",
        MutedGray: "#B8B8B8",
        Background: "#111111",
        NodeBackgground: "#1e1e1e",
        LimeGreen: "#7fd14a",
        ScreaminGreen: "#5EFF5E",
        SilverGray: "#D3D3D3",
        PeachCream: "#FFA46B",
        SkyBloom: "#6B89FF",
        CloudGray: "#E5E7EB",
        DeepSlate: "#394151",
      },
      boxShadow: {
        BlackShadow: "0px 2px 4px rgba(1, 1, 1, 0.8)",
        LightYellowShadow: "0px 1px 1px rgb(202, 238, 18, 0.7)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
