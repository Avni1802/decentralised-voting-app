import WalletProvider from "@/components/providers/wallet";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import {
  ThirdwebProvider,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { LocalWallet, SmartWallet } from "@thirdweb-dev/wallets";
import { CeloAlfajoresTestnet } from "@thirdweb-dev/chains";

const personalWallet = new LocalWallet();
await personalWallet.generate();

const config = {
  chain: CeloAlfajoresTestnet, // the chain where your smart wallet will be or is deployed
  factoryAddress: "0x423be8ad00d79960d2f06d25feab0e9fd5890425", // your own deployed account factory address
  clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
  secretKey: process.env.NEXT_PUBLIC_TW_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings
  gasless: true, // enable or disable gasless transactions
};

const wallet = new SmartWallet(config);
await wallet.connect({
  personalWallet,
});

const app_id = process.env.NEXT_PUBLIC_APP_ID || "";

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const clientID = process.env.NEXT_PUBLIC_TW_CLIENT_ID;

  return (
    <>
      {ready ? (
        <ThirdwebProvider
          clientId={clientID}
          activeChain={CeloAlfajoresTestnet}
          supportedWallets={[smartWallet(embeddedWallet(), config)]}>
          <AnonAadhaarProvider _appId={app_id}>
            <Component {...pageProps} />
          </AnonAadhaarProvider>
        </ThirdwebProvider>
      ) : (
        <ThirdwebProvider>
          <Component {...pageProps} />
        </ThirdwebProvider>
      )}
    </>
  );
}
