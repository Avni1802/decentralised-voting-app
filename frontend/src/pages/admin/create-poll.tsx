"use client"

import Link from "next/link"
import { Content } from "../../components/Content";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from 'react';

const ImageUpload = ({ control, name }: { control: any, name: string }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => {
        // This function is triggered when the image is selected or removed
        const handleImageChange = (e: any) => {
          const file = e.target.files[0];
          if (file && file.type.startsWith('image/')) {
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
              className="mb-4 block text-sm font-medium text-gray-700 cursor-pointer dark:text-gray-300"
            >
              Upload image
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
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white w-[15px] h-[15px] rounded-full"
                >
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
  votingType: z
    .string({
      required_error: "Please select an votingType to display.",
    }),
  startTime: z.date({
    required_error: "A date of birth is required.",
  }),
  endTime: z.date({
    required_error: "A date of birth is required.",
  }),
  candidates: z.array(candidateSchema).optional(),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ballotName: "",
    },
  })

  const { fields, append } = useFieldArray({
    name: "candidates",
    control: form.control,
  })


  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    console.log(values)
  }
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview('');
    }
  };

  const removeImage = () => {
    // Revoke the object URL to free up resources
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    // Clear the image and preview state
    setImage(null);
    setPreview('');
    // Reset the value of the input file
    document.getElementById('image-upload').value = '';
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
        <FormField
          control={form.control}
          name="votingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>votingType</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified votingType to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Custom">Custom</SelectItem>
                  <SelectItem value="Shareholder">Shareholder</SelectItem>
                  <SelectItem value="Auction">Auction</SelectItem>
                  <SelectItem value="Register Voters">Register Voters</SelectItem>
                  <SelectItem value="Insolvency">Insolvency</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage votingType addresses in your{" "}
                <Link href="/examples/forms">votingType settings</Link>.
              </FormDescription>
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
                        )}
                      >
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
                        )}
                      >
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
                      <FormLabel>
                        {index + 1}. Party Name
                      </FormLabel>
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
                      <FormLabel>
                        {index + 1}. Candidate Name
                      </FormLabel>
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
              <ImageUpload control={form.control} key={field.id}
                name={`candidates.${index}.image`}
              />
            </>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ partyName: "", candidateName: "" })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default function StatusPage() {
  return <ProfileForm />;
}
