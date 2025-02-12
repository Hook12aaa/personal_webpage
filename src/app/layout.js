import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { image } from "d3";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Anton",
  description: "My personal website",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
