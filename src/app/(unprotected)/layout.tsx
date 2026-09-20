import React from "react";

export default function UnProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-dvh w-full">{children}</main>;
}
