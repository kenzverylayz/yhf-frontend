import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "YHF Frontend",
  description: "CLV and Churn Metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
