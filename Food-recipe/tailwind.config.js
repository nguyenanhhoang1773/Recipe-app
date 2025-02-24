/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0B9A61",
        "text-primary": "#B0B0B0",
      },
      fontFamily: {
        "Inter-Light": ["Inter-Light"],
        "Inter-Regular": ["Inter-Regular"],
        "Inter-Medium": ["Inter-Medium"],
        "Inter-SemiBold": ["Inter-SemiBold"],
        "Inter-Bold": ["Inter-Bold"],
        "Inter-ExtraBold": ["Inter-ExtraBold"],
      },
    },
  },
  plugins: [],
};
