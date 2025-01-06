import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { FileCode, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewResponse } from "@/types/review";
import ReviewResult from "./ReviewResult";

interface CodeReview {
  id: string;
  code: string;
  language: string;
  review: ReviewResponse;
  createdAt: string;
}

interface TestCase {
  id: string;
  code: string;
  language: string;
  test: string;
  createdAt: string;
}

interface ReviewHistoryProps {
  reviews?: CodeReview[];
  testCases?: TestCase[];
  isTestGen?: boolean;
  handleDelete:(id:string)=>void
}

export function ReviewHistory({
  reviews,
  testCases,
  isTestGen,
  handleDelete
}: ReviewHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [singleReview, setSingleReview] = useState<CodeReview | null>(null);
  const [code, setCode] = useState<string | undefined>(undefined);

  const [singleTest, setSingleTest] = useState<string | undefined>(undefined);

  const handleExport = (review: any) => {
    const data = JSON.stringify(review, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-review-${format(
      new Date(review.createdAt),
      "yyyy-MM-dd"
    )}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getReviewSummary = (review: any) => {
    const counts = {
      bugs: review.review.bugs.length,
      suggestions: review.review.suggestions.length,
      optimizations: review.review.optimizations.length,
      security: review.review.security.length,
      maintainability: review.review.maintainability.length,
    };
    return counts;
  };






  return (
    <Card>
      <CardHeader>
        <CardTitle>Review History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isTestGen ? (
            <>
              {testCases &&
                testCases.map((test) => {
                  const isExpanded = expandedId === test.id;

                  return (
                    <div
                      key={test.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div
                        className="p-4 cursor-pointer  flex items-center justify-between"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : test.id)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <FileCode className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-medium">
                              {test.language.charAt(0).toUpperCase() +
                                test.language.slice(1)}{" "}
                              Test Case
                            </div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(test.createdAt), "PPp")}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <ChevronRight
                            className={`w-5 h-5 transition-transform ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 border-t bg-gray-50">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                setSingleTest(test.test);
                                setCode(test.code);
                              }}
                              variant="secondary"
                            >
                              View Details
                            </Button>
                            <Button
                              onClick={() =>handleDelete(test.id)}
                              variant="secondary"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </>
          ) : (
            <>
              {reviews &&
                reviews.map((review) => {
                  const isExpanded = expandedId === review.id;
                  const counts = getReviewSummary(review);

                  return (
                    <div
                      key={review.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div
                        className="p-4 cursor-pointer  flex items-center justify-between"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : review.id)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <FileCode className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-medium">
                              {review.language.charAt(0).toUpperCase() +
                                review.language.slice(1)}{" "}
                              Review
                            </div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(review.createdAt), "PPp")}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">
                            {counts.bugs +
                              counts.suggestions +
                              counts.optimizations}{" "}
                            findings
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 transition-transform ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 border-t bg-gray-50">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-sm">
                              <div className="font-medium text-red-600">
                                {counts.bugs} Bugs
                              </div>
                              <div className="font-medium text-blue-600">
                                {counts.suggestions} Suggestions
                              </div>
                              <div className="font-medium text-green-600">
                                {counts.optimizations} Optimizations
                              </div>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium text-purple-600">
                                {counts.security} Security Issues
                              </div>
                              <div className="font-medium text-orange-600">
                                {counts.maintainability} Maintainability Issues
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                setSingleReview(review);
                                setCode(review.code);
                              }}
                              variant="secondary"
                            >
                              View Details
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExport(review);
                              }}
                              variant="outline"
                              className="gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Export
                            </Button>
                            <Button
                              onClick={() => handleDelete(review.id)}
                              variant="secondary"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

              {reviews && reviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No review history yet. Submit your first code review to get
                  started!
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>

      {singleReview && (
        <ReviewResult
          review={singleReview.review}
          code={code}
          testCase={singleTest}
        />
      )}

      {singleTest && (
        <ReviewResult
          code={code}
          testCase={singleTest}
          isTestGen={true}
          isTestFullHistory = {true}
        />
      )}
    </Card>
  );
}
