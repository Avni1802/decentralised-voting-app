import WalletProvider from '@/components/providers/wallet'
import '@/styles/globals.css'
import { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

const app_id = process.env.NEXT_PUBLIC_APP_ID || "";

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
          <Component {...pageProps} />
        </AnonAadhaarProvider>
    </WalletProvider>
      ) : <WalletProvider>
            <Component {...pageProps} />
      </WalletProvider>}
    </>
  )
}
