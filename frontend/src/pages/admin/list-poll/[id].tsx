"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import qrImage from "@/images/qr.jpg"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

import React, { useEffect, useState } from 'react';
import { useAnonAadhaar } from "anon-aadhaar-react";
import { ethers } from "ethers";
import { exportCallDataGroth16FromPCD } from "@/lib/utils";


const zkvote = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ballotName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "partyName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "candidateName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_partyLogo",
        "type": "string"
      }
    ],
    "name": "addParty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_ballotName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ballotImage",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_endTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_entryRestriction",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "_candidateName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_partyLogo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_partyName",
        "type": "string"
      }
    ],
    "name": "createBallot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifierAddr",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_ballotName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_partyName",
        "type": "string"
      },
      {
        "internalType": "uint256[2]",
        "name": "_pA",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2][2]",
        "name": "_pB",
        "type": "uint256[2][2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "_pC",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[34]",
        "name": "_pubSignals",
        "type": "uint256[34]"
      }
    ],
    "name": "voteForParty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "anonAadhaarVerifierAddr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ballot",
    "outputs": [
      {
        "internalType": "string",
        "name": "ballotImage",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "entryRestriction",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "ballots",
    "outputs": [
      {
        "internalType": "string",
        "name": "ballotImage",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "entryRestriction",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[2]",
        "name": "_pA",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2][2]",
        "name": "_pB",
        "type": "uint256[2][2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "_pC",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[34]",
        "name": "_pubSignals",
        "type": "uint256[34]"
      }
    ],
    "name": "verify",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const Popup = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  const { toast } = useToast()

  useEffect(() => {
    setTimeout(() => {
      onClose();
      toast({
        title: "You vote has been casted successfully",
      });
    }, 7000);
  }, [isOpen])

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <div className="mt-2 px-7 py-3">
            {children}
          </div>
          <div className="items-center px-4 py-3">
            {/* <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {


  return (
    <div className="App">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Popup
      </button>


    </div>
  );
};


const MyCardComponent = ({
  imageSrc,
  title,
  description,
  startTime,
  endTime,
}: any) => {

  return (
    <div className="max-w-xs w-full flex-1 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <img
        className="w-full h-36 object-cover object-center"
        src={imageSrc}
        alt="Card image"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {title}
        </h2>

        <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
          {description}
        </p>
      </div>
    </div>
  );
};

const FormSchema = z.object({
  type: z.string(),
});

export default function RadioGroupForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [anonAadhaar] = useAnonAadhaar();

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    openPopup();
    const contractABI = zkvote;
    const contractAddress = "0x087c58e13482535c1c107B300f6DBd3f505FA093";
    const privateKey =
      "32ba4b61b6faf511b67dadb108513cc1e4a68bb73a06f505e479344a5fb9f7e3";
    const rpcUrl = "https://rpc.public.zkevm-test.net";

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const wallet = new ethers.Wallet(privateKey, provider);
    const connectedContract = new ethers.Contract(
      contractAddress,
      contractABI,
      wallet
    );
    try {
      const { a, b, c, Input: input } = await exportCallDataGroth16FromPCD(anonAadhaar.pcd);
      console.log(a, b, c, input)
      // Replace with your contract method and parameters
      const result = await connectedContract.voteForParty(
        "test112",
        "test112",
        a, b, c, input
      );
      console.log("Contract interaction result:", result);
    } catch (error) {
      console.error("Error interacting with contract:", error?.message);
    }
  }

  const candidates = [
    {
      candidateName: "Narendra Modi",
      partyName: "BJP",
      image: "https://toppng.com/uploads/preview/bjp-logo-png-bjp-logo-in-11562869869mp8vi612yw.png",
    },
    {
      candidateName: "Rahul Gandhi",
      partyName: "Congress",
      image: "https://th.bing.com/th/id/OIP.3bHXtwtMi1MYS2EDjLrzowHaG8?rs=1&pid=ImgDetMain",

    },
    {
      candidateName: "Arvind Kejriwal",
      partyName: "AAP",
      image: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/09/30/737639-aap-logo.jpg"
    },
  ];

  return (
    <Form {...form}>
      <Popup isOpen={isPopupOpen} onClose={closePopup} title="To Verify that you are above 18 please verify your credentials using polygon ID">
        <img src="/images/qr.jpg" alt="" />
      </Popup>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>The India Voting</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-y-1 space-x-8">
                  {candidates.map((candidate, index) => (
                    <FormItem
                      key={index}
                      className="flex flex-1 items-center flex-col-reverse space-y-3 gap-2">
                      <FormControl>
                        <RadioGroupItem value={candidate.partyName} />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <MyCardComponent
                          imageSrc={candidate?.image}
                          title={candidate.partyName}
                          description={candidate.candidateName}
                        />
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
