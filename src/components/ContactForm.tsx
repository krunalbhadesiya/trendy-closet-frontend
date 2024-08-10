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

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  notes: z.string().min(10, { // Changed from message to notes
    message: "Notes must be at least 10 characters.",
  }),
  label: z.string().nonempty({ // Ensure label is required
    message: "Label is required.",
  }),
});

function ContactUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "", // Changed from message to notes
      label: "Progress",  // Default value for label
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
   
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/contacts`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('API response:', response.data);
      toast({
        title: "Form Submitted Successfully",
        description: "Your form data has been submitted successfully.",
      });

      // Reset the form fields after successful submission
      form.reset({
        name: "",
        email: "",
        phone: "",
        notes: "", // Changed from message to notes
        label: "Progress",  // Reset label to default
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
          name="name"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Phone No</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes" // Changed from message to notes
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel> {/* Updated label */}
              <FormControl>
                <textarea
                  placeholder="Enter your notes"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                  {...field}
                ></textarea>
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

export default ContactUsForm;
