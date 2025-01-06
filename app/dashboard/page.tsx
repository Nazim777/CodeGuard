"use client";

import { useState, useEffect } from "react";
import { CodeInput } from "@/components/CodeInput";
import ReviewResult from "../../components/ReviewResult";
import { ReviewHistory } from "@/components/ReviewHistory";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewResponse } from "@/types/review";
import { deleteReview } from "@/utils/actions";
import Loader from "@/components/Loader";

interface CodeReview {
  id: string;
  code: string;
  language: string;
  review: ReviewResponse;
  createdAt: string;
}



export default function CodeReviewDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [reviews, setReviews] = useState<CodeReview[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const handleSubmit = async (code: string, language: string) => {
    try {
      setLoading(true);
      setError(null);
      setIsCompleted(false);
     
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to get code review, please try again!");
      }
      setIsCompleted(true);
      const data = await response.json();
      setReview(data);
      fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await deleteReview(id);
    if (response.success) {
      const filteredReviews = reviews.filter((review) => review.id !== id);
      setReviews(filteredReviews);
    }
  };
  return (
    <main className="container mx-auto px-4 my-12 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">AI Code Review</h1>
      </div>

      <Tabs defaultValue="review">
        <TabsList>
          <TabsTrigger value="review">New Review</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="review">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <CodeInput
                onSubmit={handleSubmit}
                isLoading={loading}
                isCompleted={isCompleted}
              />
            </div>

            <div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {review && <ReviewResult review={review}/>}
              {loading&& <Loader content='Please wait while reviewing your code...'/>}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <ReviewHistory handleDelete={handleDelete} reviews={reviews} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
