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

export default function ThirdWebWallet() {
  return <div></div>;
}
