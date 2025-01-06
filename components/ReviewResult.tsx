import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bug, Lightbulb, Zap, Shield } from "lucide-react";
import { ReviewResponse } from "@/types/review";

interface ReviewResultProps {
  review?: ReviewResponse;
  code?: string;
  testCase?: string;
  isTestGen?: boolean;
  isTestFullHistory?: boolean;
 
}

export default function ReviewResult({
  review,
  code,
  testCase,
  isTestGen,
  isTestFullHistory,
  
}: ReviewResultProps) {
  const sections = [
    {
      title: "Potential Bugs",
      items: review && review.bugs,
      icon: Bug,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Suggestions",
      items: review && review.suggestions,
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Optimizations",
      items: review && review.optimizations,
      icon: Zap,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Security",
      items: review && review.security,
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Maintainability",
      items: review && review.maintainability,
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];
  //solution_code

 
  return (
    <Card className="w-full ">
      
      <CardHeader>
        <CardTitle>
          {isTestGen ? "Test Case Result" : "Code Review Results"}
        </CardTitle>
                  
        
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Code Display Section */}
          {isTestGen && isTestFullHistory ? (
            <>
              <section className="bg-gray-900 text-white rounded-lg p-4 overflow-auto max-h-96 relative">
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      if (code) navigator.clipboard.writeText(code);
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-medium p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    📋
                  </button>
                </div>
                <h3 className="text-lg font-semibold mb-3">Submitted Code</h3>
                <pre className="whitespace-pre-wrap">
                  <code>{code}</code>
                </pre>
              </section>

              <section className="bg-gray-900 text-white rounded-lg p-4 overflow-auto max-h-100 relative">
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() =>{
                      if(testCase)
                        navigator.clipboard.writeText(testCase)
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-medium p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    📋
                  </button>
                </div>
                <h3 className="text-lg font-semibold mb-3">Test Cases</h3>
                <pre className="whitespace-pre-wrap">
                  <code>{testCase}</code>
                </pre>
              </section>
            </>
          ) : isTestGen ? (
            <section className="bg-gray-900 text-white rounded-lg p-4 overflow-auto max-h-100 relative">
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() =>{
                      if(testCase)
                        navigator.clipboard.writeText(testCase)
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-medium p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    📋
                  </button>
                </div>
                <h3 className="text-lg font-semibold mb-3">Test Cases</h3>
                <pre className="whitespace-pre-wrap">
                  <code>{testCase}</code>
                </pre>
              </section>
          ) : (
            <>
              {code && (
               <section className="bg-gray-900 text-white rounded-lg p-4 overflow-auto max-h-96 relative">
               <div className="absolute top-2 right-2">
                 <button
                   onClick={() => {
                     if (code) navigator.clipboard.writeText(code);
                   }}
                   className="bg-gray-700 hover:bg-gray-600 text-white font-medium p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 >
                   📋
                 </button>
               </div>
               <h3 className="text-lg font-semibold mb-3">Submitted Code</h3>
               <pre className="whitespace-pre-wrap">
                 <code>{code}</code>
               </pre>
             </section>
              )}

              {review?.solution_code && (
                <section className="bg-gray-900 text-white rounded-lg p-4 overflow-auto max-h-96 relative">
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => {
                      if (code) navigator.clipboard.writeText(code);
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-medium p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    📋
                  </button>
                </div>
                <h3 className="text-lg font-semibold mb-3">Solution Code</h3>
                <pre className="whitespace-pre-wrap">
                  <code>{review.solution_code}</code>
                </pre>
              </section>
              )}

              {/* Review Sections */}
              {sections.map(({ title, items, icon: Icon, color, bgColor }) =>
                items && items.length > 0 ? (
                  <section key={title} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${color}`} />
                      <h3 className={`text-lg font-semibold ${color}`}>
                        {title}
                      </h3>
                    </div>
                    <div className={`p-4 rounded-lg ${bgColor}`}>
                      <ul className="list-disc pl-5 space-y-2">
                        {items.map((item, index) => (
                          <li key={index} className="text-gray-700">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                ) : null
              )}

              {review  &&
                Object.values(review).every((arr) => arr.length === 0) && (
                  <Alert>
                    <AlertDescription>
                      No issues found! Your code looks great.
                    </AlertDescription>
                  </Alert>
                )}
                
            </>
          )}

          
        </div>
      </CardContent>
    </Card>
  );
}
