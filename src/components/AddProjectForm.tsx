/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  tag: z.string().min(1, {
    message: "Please select any one tag.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  maxIndex: z.string().min(1, {
    message: "Photos Max Index must be at least 1 character.",
  }),
});

function AddProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      tag: "",
      description: "",
      maxIndex: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/projects`, data);
      console.log('API response:', response.data);
      toast({
        title: "Form Submitted Successfully",
        description: "Your form data has been submitted successfully.",
      });

      // Reset the form fields after successful submission
      form.reset({
        title: "",
        tag: "",
        description: "",
        maxIndex: "",
      });
    } catch (error) {
      console.error('API error:', error);
      toast({
        title: "Error",
        description: "Failed to submit form data. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }: { field: any }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tag</FormLabel>
              <RadioGroup defaultValue="Web" value={field.value} onValueChange={(value) => form.setValue("tag", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Web" id="Web-Development" />
                  <Label htmlFor="Web-Development">
                    Web Development
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Software" id="Software-Development" />
                  <Label htmlFor="Software-Development">Software Development</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="IT Consulting" id="IT-Consulting" />
                  <Label htmlFor="IT-Consulting">IT Consulting</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ui Ux Design" id="Ui-Ux-Design" />
                  <Label htmlFor="Ui-Ux-Design">Ui Ux Design</Label>
                </div>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Enter your description"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                  {...field}
                ></textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxIndex"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Photos Max Index</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter project photos max index" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>Submit</Button>
      </form>
    </Form>
  );
}

export default AddProjectForm;
