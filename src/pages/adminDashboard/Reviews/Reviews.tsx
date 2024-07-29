"use client";

import { useState, useMemo } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Star } from "iconsax-react";

type Feedback = {
  id: number;
  feedId: string;
  product: string;
  customer: string;
  rating: number;
  comment: string;
  createdAt: string;
  testimonial: string;
};

type SortKey = keyof Feedback;

const AdminReview = () => {
  const [sort, setSort] = useState<{ key: SortKey; order: 'asc' | 'desc' }>({ key: 'rating', order: 'desc' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(null);

  const [feedbackData, setFeedbackData] = useState<Feedback[]>([
    {
      id: 1,
      feedId: "F001",
      product: "Retro Logo T-Shirt",
      customer: "John Doe",
      rating: 4.5,
      comment: "Great design, love the vintage feel!",
      createdAt: "2023-05-01",
      testimonial: "Yes",
    },
    {
      id: 2,
      feedId: "F002",
      product: "Minimalist Stripes Tee",
      customer: "Jane Smith",
      rating: 3.8,
      comment: "The design is a bit plain, could use more detail.",
      createdAt: "2023-05-05",
      testimonial: "No",
    },
    {
      id: 3,
      feedId: "F003",
      product: "Floral Pattern Blouse",
      customer: "Michael Johnson",
      rating: 4.2,
      comment: "The colors and pattern are beautiful, great job!",
      createdAt: "2023-05-10",
      testimonial: "Yes",
    },
    {
      id: 4,
      feedId: "F004",
      product: "Retro Logo T-Shirt",
      customer: "Emily Davis",
      rating: 4.8,
      comment: "I love this design, it looks amazing on the tshirt!",
      createdAt: "2023-05-15",
      testimonial: "No",
    },
    {
      id: 5,
      feedId: "F005",
      product: "Minimalist Stripes Tee",
      customer: "David Lee",
      rating: 3.5,
      comment: "The design is a bit boring, could use more creativity.",
      createdAt: "2023-05-20",
      testimonial: "Yes",
    },
    {
      id: 6,
      feedId: "F006",
      product: "Floral Pattern Blouse",
      customer: "Sarah Wilson",
      rating: 4.6,
      comment: "The design is beautiful and unique, great work!",
      createdAt: "2023-05-25",
      testimonial: "No",
    },
  ]);

  const filteredData = useMemo(() => {
    return feedbackData.sort((a, b) => {
      if (sort.key === 'rating' || sort.key === 'createdAt') {
        const aValue = sort.key === 'createdAt' ? new Date(a[sort.key]).getTime() : a[sort.key];
        const bValue = sort.key === 'createdAt' ? new Date(b[sort.key]).getTime() : b[sort.key];
        return sort.order === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return sort.order === 'asc' ? (a[sort.key] as string).localeCompare(b[sort.key] as string) : (b[sort.key] as string).localeCompare(a[sort.key] as string);
      }
    });
  }, [sort, feedbackData]);

  const handleSort = (key: SortKey) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key, order: 'desc' });
    }
  };

  const handleTestimonialChange = (feedbackId: number) => {
    setSelectedFeedbackId(feedbackId);
    setShowConfirmation(true);
  };

  const handleConfirmTestimonialChange = () => {
    if (selectedFeedbackId === null) return;

    const updatedFeedbackData = feedbackData.map((feedback) => {
      if (feedback.id === selectedFeedbackId) {
        return {
          ...feedback,
          testimonial: feedback.testimonial === 'Yes' ? 'No' : 'Yes',
        };
      }
      return feedback;
    });

    setFeedbackData(updatedFeedbackData);
    setShowConfirmation(false);
    setSelectedFeedbackId(null);
  };

  const handleCancelTestimonialChange = () => {
    setShowConfirmation(false);
    setSelectedFeedbackId(null);
  };

  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="w-full text-center text-2xl font-bold mb-6 ">Feedback Data Management</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4" />
        </div>
      </div>
      <div className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("feedId")}>
                Feed ID
                {sort.key === "feedId" && <span className="ml-2">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("product")}>
                Product Name
                {sort.key === "product" && <span className="ml-2">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                Customer
                {sort.key === "customer" && <span className="ml-2">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("rating")}>
                Rating
                {sort.key === "rating" && <span className="ml-2">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Testimonial</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
                Created At
                {sort.key === "createdAt" && <span className="ml-2">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.feedId}</TableCell>
                <TableCell>{feedback.product}</TableCell>
                <TableCell>{feedback.customer}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(Math.floor(feedback.rating))].map((_, index) => (
                        <Star key={index} className="w-4 h-4 fill-primary" />
                      ))}
                      {[...Array(5 - Math.floor(feedback.rating))].map((_, index) => (
                        <Star key={index} className="w-4 h-4 fill-muted stroke-muted-foreground" />
                      ))}
                    </div>
                    <span>({feedback.rating})</span>
                  </div>
                </TableCell>
                <TableCell>{feedback.comment}</TableCell>
                <TableCell>
                  {feedback.id === selectedFeedbackId && showConfirmation ? (
                    <div className="flex items-center gap-2">
                      <Select
                        defaultValue={feedback.testimonial}
                        onValueChange={(value) => {
                          const updatedFeedbackData = feedbackData.map((f) => {
                            if (f.id === feedback.id) {
                              return { ...f, testimonial: value };
                            }
                            return f;
                          });
                          setFeedbackData(updatedFeedbackData);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select testimonial status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleTestimonialChange(feedback.id)}
                    >
                      {feedback.testimonial}
                    </button>
                  )}
                </TableCell>
                <TableCell>{feedback.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will change the testimonial status for this feedback.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelTestimonialChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmTestimonialChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminReview;
