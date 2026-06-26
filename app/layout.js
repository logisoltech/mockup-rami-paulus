import { Montserrat } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Northline Advisory",
  description:
    "Operator-focused B2B advisory for founders, operators, and leadership teams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="overflow-x-hidden">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
