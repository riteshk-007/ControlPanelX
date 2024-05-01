import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/Provider";
import { Toaster } from "react-hot-toast";

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
          <AuthProvider>
            <Toaster position="bottom-right" />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
