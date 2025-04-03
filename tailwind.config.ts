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
    "text-NeutralGray",
    "text-MidnightBlack",
    "text-GoldenYellow",
    "text-SunsetYellow",
    "text-CreamYellow",
    "text-LightYellow",
    "text-SoftPink",
    "text-BrightCyan",
    "text-Red",
    "text-NeonOrange",
    "text-PaleYellow",
    "text-VividGreen",
    "text-ForestGreen",
    "text-AmberGold",
    "text-WalnutBrown",
    "text-ChestnutBrown",
    "text-DeepBurgundy",
    "text-DarkMahogany",
    "text-LightOrange",
    "text-Orange",
    "text-Beige",
    "text-SoftRed",
    "text-SkyBlue",
    "text-Goldenrod",
    "text-MutedGray",
    "text-Background",
    "text-NodeBackground",
    "text-LimeGreen",
    "text-ScreaminGreen",
    "text-SilverGray",
    "text-PeachCream",
    "text-SkyBloom",
    "text-CloudGray",
    "text-DeepSlate",
    "text-GoldenAmber",
    "text-CedarBrown",
    "text-Sandstone",
    "text-Sunbeam",
    "text-PeachBlush",
    "text-CoralRose",
    "text-Chestnut",
    "text-TealMist",
    "text-OliveLeaf",
    "text-SkyHorizon",
    "text-OceanBlue",
    "text-RoyalLilac",
    "text-DeepIndigo",
    "text-AshGray",
    "text-SandyOchre",
    "text-BurningOrange",
    "text-MossGreen",
    "text-CobaltBlue",
    "text-IndigoViolet",
    "text-RoyalPurple",
    "hover:text-NeutralGray",
    "hover:text-MidnightBlack",
    "hover:text-GoldenYellow",
    "hover:text-SunsetYellow",
    "hover:text-CreamYellow",
    "hover:text-LightYellow",
    "hover:text-SoftPink",
    "hover:text-BrightCyan",
    "hover:text-Red",
    "hover:text-NeonOrange",
    "hover:text-PaleYellow",
    "hover:text-VividGreen",
    "hover:text-ForestGreen",
    "hover:text-AmberGold",
    "hover:text-WalnutBrown",
    "hover:text-ChestnutBrown",
    "hover:text-DeepBurgundy",
    "hover:text-DarkMahogany",
    "hover:text-LightOrange",
    "hover:text-Orange",
    "hover:text-Beige",
    "hover:text-SoftRed",
    "hover:text-SkyBlue",
    "hover:text-Goldenrod",
    "hover:text-MutedGray",
    "hover:text-Background",
    "hover:text-NodeBackground",
    "hover:text-LimeGreen",
    "hover:text-ScreaminGreen",
    "hover:text-SilverGray",
    "hover:text-PeachCream",
    "hover:text-SkyBloom",
    "hover:text-CloudGray",
    "hover:text-DeepSlate",
    "hover:text-GoldenAmber",
    "hover:text-CedarBrown",
    "hover:text-Sandstone",
    "hover:text-Sunbeam",
    "hover:text-PeachBlush",
    "hover:text-CoralRose",
    "hover:text-Chestnut",
    "hover:text-TealMist",
    "hover:text-OliveLeaf",
    "hover:text-SkyHorizon",
    "hover:text-OceanBlue",
    "hover:text-RoyalLilac",
    "hover:text-DeepIndigo",
    "hover:text-AshGray",
    "hover:text-SandyOchre",
    "hover:text-BurningOrange",
    "hover:text-MossGreen",
    "hover:text-CobaltBlue",
    "hover:text-IndigoViolet",
    "hover:text-RoyalPurple",
    "grid-cols-8",
    "grid-cols-9",
    "grid-cols-10",
    "grid-cols-11",
    "grid-cols-12",
    "col-span-8",
    "col-span-9",
    "col-span-10",
    "col-span-11",
    "col-span-12",
  ],

  theme: {
    extend: {
      extend: {
        fontFamily: {
          sans: ["var(--font-inter)"],
        },
      },
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
        NodeBackground: "#1e1e1e",
        LimeGreen: "#7fd14a",
        ScreaminGreen: "#5EFF5E",
        SilverGray: "#D3D3D3",
        PeachCream: "#FFA46B",
        SkyBloom: "#6B89FF",
        CloudGray: "#E5E7EB",
        DeepSlate: "#394151",
        GoldenAmber: "#FFB74D",
        CedarBrown: "#7C5B2A",
        Sandstone: "#D8BCA3",
        Sunbeam: "#F6D776",
        PeachBlush: "#F4B183",
        CoralRose: "#F08C8C",
        Chestnut: "#9C6B5C",
        TealMist: "#5BAA9D",
        OliveLeaf: "#79A85A",
        SkyHorizon: "#B4D1E1",
        OceanBlue: "#6DAEDB",
        RoyalLilac: "#A87DC2",
        DeepIndigo: "#5D5F9E",
        AshGray: "#807F7B",
        SandyOchre: "#D4A076",
        BurningOrange: "#E06A32",
        MossGreen: "#70A568",
        CobaltBlue: "#4B91A3",
        IndigoViolet: "#5A5FAA",
        RoyalPurple: "#914FA3",
      },
      boxShadow: {
        BlackShadow: "0px 2px 4px rgba(1, 1, 1, 0.8)",
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
