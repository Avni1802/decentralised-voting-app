import WalletProvider from '@/components/providers/wallet'
import { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { DashboardLayout } from "@/dashboard/Layout";
import { Inter as FontSans } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"

import '@/styles/globals.css'
const app_id = process.env.NEXT_PUBLIC_APP_ID || "";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>

      {ready ? (
        <WalletProvider>
          <AnonAadhaarProvider _appId={app_id}>
            <DashboardLayout>
              <Toaster />
              <Component {...pageProps} />
            </DashboardLayout>
          </AnonAadhaarProvider>
        </WalletProvider>
      ) : <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>}
    </>
  )
}
