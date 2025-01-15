import type { Config } from "tailwindcss";

const rem = (px: number) => `${px / 16}rem`;

export default {
  content: [
    "./app/components/**/*.{js,ts,jsx,tsx}",
    "./app/routes/**/*.{js,ts,jsx,tsx}",
    "./app/ui/**/*.{js,ts,jsx,tsx}",
    "./app/root.tsx",
  ],
  theme: {
    colors: {
      // BASE TOKEN (avoid this)
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",

      white: "hsl(var(--color-white))",

      grey: {
        5: "hsl(var(--color-grey-5))",
        10: "hsl(var(--color-grey-10))",
        20: "hsl(var(--color-grey-20))",
        30: "hsl(var(--color-grey-30))",
        40: "hsl(var(--color-grey-40))",
        50: "hsl(var(--color-grey-50))",
        60: "hsl(var(--color-grey-60))",
        70: "hsl(var(--color-grey-70))",
        80: "hsl(var(--color-grey-80))",
        90: "hsl(var(--color-grey-90))",
        92: "hsl(var(--color-grey-92))",
        93: "hsl(var(--color-grey-93))",
        95: "hsl(var(--color-grey-95))",
        96: "hsl(var(--color-grey-96))",
        97: "hsl(var(--color-grey-97))",
        98: "hsl(var(--color-grey-98))",
        99: "hsl(var(--color-grey-99))",
      },

      purple: {
        10: "hsl(var(--color-purple-10))",
        20: "hsl(var(--color-purple-20))",
        30: "hsl(var(--color-purple-30))",
        40: "hsl(var(--color-purple-40))",
        50: "hsl(var(--color-purple-50))",
        60: "hsl(var(--color-purple-60))",
        70: "hsl(var(--color-purple-70))",
        80: "hsl(var(--color-purple-80))",
        90: "hsl(var(--color-purple-90))",
        95: "hsl(var(--color-purple-95))",
        97: "hsl(var(--color-purple-97))",
        98: "hsl(var(--color-purple-98))",
        99: "hsl(var(--color-purple-99))",
      },

      red: {
        10: "hsl(var(--color-red-10))",
        20: "hsl(var(--color-red-20))",
        30: "hsl(var(--color-red-30))",
        40: "hsl(var(--color-red-40))",
        50: "hsl(var(--color-red-50))",
        60: "hsl(var(--color-red-60))",
        70: "hsl(var(--color-red-70))",
        80: "hsl(var(--color-red-80))",
        90: "hsl(var(--color-red-90))",
        95: "hsl(var(--color-red-95))",
        97: "hsl(var(--color-red-97))",
        98: "hsl(var(--color-red-98))",
        99: "hsl(var(--color-red-99))",
      },

      green: {
        10: "hsl(var(--color-green-10))",
        20: "hsl(var(--color-green-20))",
        30: "hsl(var(--color-green-30))",
        40: "hsl(var(--color-green-40))",
        50: "hsl(var(--color-green-50))",
        60: "hsl(var(--color-green-60))",
        70: "hsl(var(--color-green-70))",
        80: "hsl(var(--color-green-80))",
        90: "hsl(var(--color-green-90))",
        95: "hsl(var(--color-green-95))",
        97: "hsl(var(--color-green-97))",
        98: "hsl(var(--color-green-98))",
        99: "hsl(var(--color-green-99))",
      },

      blue: {
        10: "hsl(var(--color-blue-10))",
        20: "hsl(var(--color-blue-20))",
        30: "hsl(var(--color-blue-30))",
        40: "hsl(var(--color-blue-40))",
        50: "hsl(var(--color-blue-50))",
        60: "hsl(var(--color-blue-60))",
        70: "hsl(var(--color-blue-70))",
        80: "hsl(var(--color-blue-80))",
        90: "hsl(var(--color-blue-90))",
        95: "hsl(var(--color-blue-95))",
        97: "hsl(var(--color-blue-97))",
      },

      orange: {
        10: "hsl(var(--color-orange-10))",
        20: "hsl(var(--color-orange-20))",
        30: "hsl(var(--color-orange-30))",
        40: "hsl(var(--color-orange-40))",
        50: "hsl(var(--color-orange-50))",
        60: "hsl(var(--color-orange-60))",
        70: "hsl(var(--color-orange-70))",
        80: "hsl(var(--color-orange-80))",
        90: "hsl(var(--color-orange-90))",
        95: "hsl(var(--color-orange-95))",
        97: "hsl(var(--color-orange-97))",
      },

      // SEMANTIC TOKENS (use this)

      // GENERAL

      app: {
        bg: "hsl(var(--color-white))",
        bgdark: "hsl(var(--color-app-bg-dark))",
      },

      error: "hsl(var(--color-red-60))",
      link: "hsl(var(--color-blue-40))",
      focus: "hsl(var(--color-purple-50))",

      // TEXT

      txt: {
        dark: "hsl(var(--color-grey-5))",
        light: "hsl(var(--color-grey-40))",
        placeholder: "hsl(var(--color-grey-70))",
      },

      // BORDER

      border: {
        dark: "hsl(var(--color-grey-40))",
        neutral: "hsl(var(--color-grey-60))",
        base: "hsl(var(--color-grey-90))",
        light: "hsl(var(--color-grey-92))",
        transparent: "transparent",
      },

      // BUTTON

      btn: {
        txt: {
          DEFAULT: "hsl(var(--color-grey-10))",
          light: "hsl(var(--color-grey-40))",
          disabled: "hsl(var(--color-grey-70))",
          primary: "hsl(var(--color-white))",
          danger: "hsl(var(--color-red-40))",
          success: "hsl(var(--color-green-30))",
        },

        border: {
          DEFAULT: "hsl(var(--color-grey-60))",
          disabled: "hsl(var(--color-grey-90))",
          danger: "hsl(var(--color-red-40))",
          success: "hsl(var(--color-green-30))",
        },

        bg: {
          DEFAULT: "hsl(var(--color-white))",

          disabled: "hsl(var(--color-grey-95))",
        },

        hover: {
          DEFAULT: "hsl(var(--color-grey-98))",
          danger: "hsl(var(--color-red-98))",
          success: "hsl(var(--color-green-98))",
        },

        active: {
          DEFAULT: "hsl(var(--color-grey-90))",
          danger: "hsl(var(--color-red-95))",
          success: "hsl(var(--color-green-95))",
        },
      },

      // STATUS

      status: {
        neutral: "hsl(var(--color-grey-80))",
        success: "hsl(var(--color-green-50))",
        warn: "hsl(var(--color-orange-80))",
        error: "hsl(var(--color-red-60))",
        critical: "hsl(var(--color-grey-10))",
      },

      // TOAST

      toast: {
        bg: "hsl(var(--color-grey-10))",
        txt: "hsl(var(--color-white))",
        "icon-bg": {
          success: "hsl(164, 39%, 20%)",
          warn: "hsl(23, 40%, 26%)",
        },

        "icon-txt": {
          success: "hsl(163, 52%, 70%)",
          warn: "hsl(23, 100%, 70%)",
        },
      },

      // LABELS

      label: {
        bg: {
          neutral: "hsl(var(--color-grey-95))",
          dark: "hsl(var(--color-grey-90))",
          accent: "hsl(var(--color-purple-98))",
          warn: "hsl(var(--color-orange-95))",
          error: "hsl(var(--color-red-95))",
          info: "hsl(var(--color-blue-97))",
          success: "hsl(var(--color-green-95))",
          critical: "hsl(var(--color-grey-10))",

          "neutral-2": "hsl(var(--color-grey-90))",
          "dark-2": "hsl(var(--color-grey-85))",
          "accent-2": "hsl(var(--color-purple-90))",
          "warn-2": "hsl(var(--color-orange-90))",
          "error-2": "hsl(var(--color-red-90))",
          "info-2": "hsl(var(--color-blue-90))",
          "success-2": "hsl(var(--color-green-90))",
          "critical-2": "hsl(var(--color-grey-50))",
        },

        txt: {
          neutral: "hsl(var(--color-grey-10))",
          dark: "hsl(var(--color-grey-10))",
          "neutral-2": "hsl(var(--color-grey-40))",
          accent: "hsl(var(--color-purple-30))",
          warn: "hsl(var(--color-orange-30))",
          error: "hsl(var(--color-red-40))",
          info: "hsl(var(--color-blue-40))",
          success: "hsl(var(--color-green-30))",
          critical: "hsl(var(--color-white))",
        },

        border: {
          neutral: "hsl(var(--color-grey-20))",
          dark: "hsl(var(--color-grey-10))",
          "neutral-2": "hsl(var(--color-grey-90))",
          accent: "hsl(var(--color-purple-60))",
          warn: "hsl(var(--color-orange-60))",
          error: "hsl(var(--color-red-50))",
          info: "hsl(var(--color-blue-50))",
          success: "hsl(var(--color-green-50))",
          critical: "hsl(var(--color-grey-30))",
        },
      },

      // NOTIFICATION BANNER

      notification: {
        bg: "hsl(var(--color-grey-10))",
        txt: "hsl(var(--color-white))",
      },

      // LISTS/TABLES

      list: {
        bg: "hsl(var(--color-white))",

        header: {
          bg: "hsl(var(--color-white))",
          txt: "hsl(var(--color-grey-40))",
          border: "hsl(var(--color-grey-90))",
        },

        item: {
          hover: "hsl(var(--color-grey-99))",
          txt: {
            dark: "hsl(var(--color-grey-10))",
            light: "hsl(var(--color-grey-40))",
          },
        },

        line: "hsl(var(--color-grey-93))",
      },
    },

    fontFamily: {
      body: ["Open\\ Sans"],
      mono: ["Fira Mono", "Monaco", "menlo", "monospace"],
    },

    fontSize: {
      sm: [rem(12), { lineHeight: rem(16) }],
      base: [rem(14), { lineHeight: rem(18) }],
      lg: [rem(16), { lineHeight: rem(22) }],
      xl: [rem(18), { lineHeight: rem(20) }],
      "2xl": [rem(20), { lineHeight: rem(24) }],
      "3xl": [rem(22), { lineHeight: rem(26) }],
      "4xl": [rem(24), { lineHeight: rem(32) }],
      "5xl": [rem(28), { lineHeight: rem(40) }],
    },

    extend: {
      aria: {
        invalid: `invalid="true"`,
      },
      boxShadow: {
        "light-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        light: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.03)",
        "light-md":
          "0 4px 8px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.03)",
        "light-lg":
          "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.03)",
        "light-xl":
          "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.03)",
        "light-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.08)",
      },
      keyframes: {
        hide: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        grow: {
          "0%": { right: "100%", opacity: "1" },
          "100%": { right: "0%", opacity: "1" },
        },

        ttSlideUpAndFade: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ttSlideRightAndFade: {
          "0%": { opacity: "0", transform: "translateX(-4px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        ttSlideDownAndFade: {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ttSlideLeftAndFade: {
          "0%": { opacity: "0", transform: "translateX(4px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        toastSlideIn: {
          from: {
            transform: `translateX(calc(100% + var(--viewport-padding)))`,
          },
          to: { transform: "translateX(0)" },
        },
        toastSwipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: `translateX(calc(100% + var(--viewport-padding)))` },
        },

        detailsContentShow: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        slideUpAndFade: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          "0%": { opacity: "0", transform: "translateX(8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        ghostEyes: {
          "0%": { left: "15px" },
          "20%": { left: "9px" },
          "60%": { left: "9px" },
          "80%": { left: "15px" },
          "100%": { left: "15px" },
        },
        ghostJump: {
          "0%": { top: "4px" },
          "50%": { top: "0px" },
          "100%": { top: "4px" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
