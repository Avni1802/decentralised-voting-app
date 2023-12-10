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

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    openPopup();

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
