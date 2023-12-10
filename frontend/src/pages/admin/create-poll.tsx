"use client";

import Link from "next/link";
import { Content } from "../../components/Content";
import * as z from "zod";
import { ethers } from "ethers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { goerli, polygonZkEvmTestnet } from "viem/chains";

const zkvote = [
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
  }
]


const ImageUpload = ({
  control,
  name,
  title = "Upload Image",
}: {
  control: any;
  name: string;
  title?: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => {
        // This function is triggered when the image is selected or removed
        const handleImageChange = (e: any) => {
          const file = e.target.files[0];
          console.log("https://bafybeibjlpr6wlfc5uuydsnqmfko5z6ufkj3ewckxadf3p5cjg4cqgjcre.ipfs.nftstorage.link/")

          if (file && file.type.startsWith("image/")) {
            // Use react-hook-form's onChange to update the form state
            onChange(file);
          } else {
            onChange(null);
          }
        };

        // This function is triggered when the remove button is clicked
        const removeImage = () => {
          onChange(null);
        };

        return (
          <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <label
              htmlFor="image-upload"
              className="mb-4 block text-sm font-medium text-gray-700 cursor-pointer dark:text-gray-300">
              {title}
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                onBlur={onBlur} // Notify react-hook-form when the input is touched
                className="hidden"
              />
            </label>
            {value && (
              <div className="relative">
                <img
                  src={URL.createObjectURL(value)}
                  alt="Preview"
                  className="rounded-md h-auto max-w-[120px] mb-4"
                />
                <Button
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white w-[15px] h-[15px] rounded-full">
                  &times;
                </Button>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

const candidateSchema = z.object({
  partyName: z.string(),
  candidateName: z.string(),
  image: z.string().optional(), // Assuming the image is a URL to an image file
});

const formSchema = z.object({
  ballotName: z.string().min(2).max(50),
  ballotImage: z.string().optional(),
  votingType: z.string({
    required_error: "Please select an votingType to display.",
  }),
  startTime: z.date({
    required_error: "A date of birth is required.",
  }),
  endTime: z.date({
    required_error: "A date of birth is required.",
  }),
  candidates: z.array(candidateSchema).optional(),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ballotName: "",
    },
  });

  const { fields, append } = useFieldArray({
    name: "candidates",
    control: form.control,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Herne");
    const contractABI = zkvote;
    const contractAddress = "0x3ef01CBC562daB2bc50916651517f4DC156f8c7A";
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
      // Replace with your contract method and parameters
      console.log(values);
      const result = await connectedContract.createBallot(
        "test112",
        "SDf",
        0,
        5,
        true,
        "nam,e",
        "logo",
        "test112"
      );
      console.log("Contract interaction result:", result);
    } catch (error) {
      console.error("Error interacting with contract:", error?.message);
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    console.log(values);
  }
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    console.log("https://bafybeibjlpr6wlfc5uuydsnqmfko5z6ufkj3ewckxadf3p5cjg4cqgjcre.ipfs.nftstorage.link/")

    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview("");
    }
  };

  const removeImage = () => {
    // Revoke the object URL to free up resources
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    // Clear the image and preview state
    setImage(null);
    setPreview("");
    // Reset the value of the input file
    document.getElementById("image-upload").value = "";
  };

  // Clean up the preview URL when the component unmounts or the image changes
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="dark space-y-8">
        <FormField
          control={form.control}
          name="ballotName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title of the Voting</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ImageUpload control={form.control} name={`ballotImage`} />
        <FormField
          control={form.control}
          name="votingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voting Criteria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a suitable criteria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Custom">Age&gt;=18</SelectItem>
                  <SelectItem value="Shareholder">Age&gt;21</SelectItem>
                  <SelectItem value="Auction">collegeID</SelectItem>

                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-8">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1 w-auto">
                <FormLabel>Voting Start Time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-auto pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1 w-auto">
                <FormLabel>Voting End Time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-auto pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {fields.map((field, index) => (
            <>
              <div className="flex">
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`candidates.${index}.partyName`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{index + 1}. Party Name</FormLabel>
                      {/* <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Candidate Name
                      </FormDescription> */}
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`candidates.${index}.candidateName`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{index + 1}. Candidate Name</FormLabel>
                      {/* <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add links to your website, blog, or social media profiles.
                      </FormDescription> */}
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ImageUpload
                control={form.control}
                key={field.id}
                name={`candidates.${index}.image`}
              />
            </>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ partyName: "", candidateName: "" })}>
            Add Candidates
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default function StatusPage() {
  return <ProfileForm />;
}
