import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Aqua 短片",
  description: "在液态玻璃风格的播放器里，观看 Blender 工作室的开源动画短片和 NASA 高清太空影像。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
