import Head from "next/head";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
} from "anon-aadhaar-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"

function ButtonHome() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}

export default function Home() {
  // Use the Country Identity hook to get the status of the user.
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <div className="min-h-screen dark px-4 py-8">
      <div class="context">
      </div>


      <div class="area" >
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
      <img className="-z-10 w-full max-h-[1800px] absolute -top-5 bottom-0" src="https://assets-global.website-files.com/637359c81e22b715cec245ad/6464a7ec8c8fd22869e80364_home-hero-new-bg1.svg" loading="eager" alt=""></img>
      <main className="flex flex-col items-center gap-8 rounded-2xl max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8">

        <h1 style={{ fontSize: "50px" }} className="font-bold mb-8 text-gray">Welcome to Anononymous ZK Voting</h1>
        <p style={{ color: "rgb(150 150 150)" }} className="max-w-sm mb-8">Experience the future of secure and private voting with our cutting-edge app, designed to harness the power of zero-knowledge proofs (ZK) for anonymous voting</p>

        <div className="pt-8 mt-8 flex w-full space-x-8">
          <div className="flex-1 flex flex-col space-y-4" style={{
            backdropFilter: "blur(8px)",
            textAlign: "left",
            cursor: "pointer",
            backgroundColor: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: "12px",
            padding: "32px 24px",
            transition: "background - color .2s",
          }}>
            <h2 className="font-bold text-xl">Identity Verification</h2>
            <p style={{ color: "rgb(150 150 150)" }} className="text-xs text-coolGray-500">Leveraging the Anon Aadhar SDK for robust identity verification</p>
            <LogInWithAnonAadhaar />

          </div>
          <div className="flex-1 flex flex-col space-y-4" style={{
            backdropFilter: "blur(8px)",
            textAlign: "left",
            cursor: "pointer",
            backgroundColor: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: "12px",
            padding: "32px 24px",
            transition: "background - color .2s",
          }}>
            <h2 className="font-bold text-xl">Maintaining the Integrity</h2>
            <p style={{ color: "rgb(150 150 150)" }} className="text-xs text-coolGray-500">Leveraging the Polygon ID for seamless blockchain integration, our app ensures complete voter privacy while maintaining the integrity of each vote</p>
          </div>
          <div className="flex-1 flex flex-col space-y-4" style={{
            backdropFilter: "blur(8px)",
            textAlign: "left",
            cursor: "pointer",
            backgroundColor: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: "12px",
            padding: "32px 24px",
            transition: "background - color .2s",
          }}>
            <h2 className="font-bold text-xl">Confidentiality</h2>
            <p style={{ color: "rgb(150 150 150)" }} className="text-xs text-coolGray-500">Cast your ballot with confidence, knowing your identity remains shielded and your voice counts in a truly confidential and democratic process.</p>          </div>



        </div>

        {/* Import the Connect Button component */}
      </main >
      <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8">
        {/* Render the proof if generated and valid */}
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            <p>Got your Aadhaar Identity Proof</p>
            <>Welcome anon!</>
            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
          </>
        )}
      </div>
    </div >
  );
}
