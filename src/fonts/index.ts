import localFont from "next/font/local";

export const yekanBakh = localFont({
  src: [
    {
      path: "./YekanBakh/YekanBakhLight.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./YekanBakh/YekanBakhRegular.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./YekanBakh/YekanBakhMedium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./YekanBakh/YekanBakhBold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./YekanBakh/YekanBakhHeavy.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./YekanBakh/YekanBakhFat.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-yekan-bakh",
  display: "swap",
});


export const modam = localFont({
  src:[
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
})
