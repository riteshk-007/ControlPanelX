import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/Provider";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "@/helper/ReduxProvider";

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
        <div className="bg-blue-50 text-black">
          <AuthProvider>
            <ReduxProvider>
              <Toaster position="bottom-right" />
              {children}
            </ReduxProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
