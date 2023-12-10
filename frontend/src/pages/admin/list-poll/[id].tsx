"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const candidates = [
    {
      candidateName: "Narendra Modi",
      partyName: "BJP",
    },
    {
      candidateName: "Rahul Gandhi",
      partyName: "Congress",
    },
    {
      candidateName: "Arvind Kejriwal",
      partyName: "AAP",
    },
  ];

  return (
    <Form {...form}>
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
                          imageSrc="https://via.placeholder.com/150"
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
