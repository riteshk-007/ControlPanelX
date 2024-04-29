import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "ControlPanelX",
    description: "The modern control panel for your server.",
  },
  description: "ControlPanelX is a modern control panel for your server.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#111] text-white">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
