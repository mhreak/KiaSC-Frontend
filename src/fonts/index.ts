import localFont from "next/font/local";

export const vazir = localFont({
  src: [
    {
      path: "./Vazir/Vazir-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./Vazir/Vazir-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Vazir/Vazir-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Vazir/Vazir.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Vazir/Vazir-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export const modam = localFont({
  src: [
    {
      path: "./Modam/Modam-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./Modam/Modam-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./Modam/Modam-Regular.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Modam/Modam-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Modam/Modam-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Modam/Modam-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Modam/Modam-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Modam/Modam-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-modam",
  display: "swap",
});
