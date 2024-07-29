/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2, Trash } from "iconsax-react";

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

function UpdateProjectForm({ id }: { id: string }) {
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

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects/${id}`);
        const projectData = response.data;
        form.setValue("title", projectData.title);
        form.setValue("tag", projectData.tag);
        form.setValue("description", projectData.description);
        form.setValue("maxIndex", projectData.maxIndex);
      } catch (error) {
        console.error('API error:', error);
        toast({
          title: "Error",
          description: "Failed to fetch project data. Please try again later.",
        });
      }
    };

    fetchProjectData();
  }, [id]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/projects/${id}`, data);
      toast({
        title: "Form Updated Successfully",
        description: "Your project data has been updated successfully.",
      });
    } catch (error) {
      console.error('API error:', error);
      toast({
        title: "Error",
        description: "Failed to update project data. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/projects/${id}`);
      toast({
        title: "Project Deleted Successfully",
        description: "The project has been deleted successfully.",
      });
    } catch (error) {
      console.error('API error:', error);
      toast({
        title: "Error",
        description: "Failed to delete the project. Please try again later.",
      });
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
        <div className='flex flex-row gap-4'>
          <Button type="submit" disabled={isSubmitting} variant={'outline'}  >
            <Edit2 variant='TwoTone' className='mr-2'/>
            Update
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant={'outline'}>
                <Trash variant='TwoTone' color='red' className='mr-2'/>
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the contact.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete()}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  );
}

export default UpdateProjectForm;
