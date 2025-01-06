"use client";

import { useState, useEffect } from "react";
import { CodeInput } from "@/components/CodeInput";
import ReviewResult from "../../components/ReviewResult";
import { ReviewHistory } from "@/components/ReviewHistory";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  deleteTest } from "@/utils/actions";
import Loader from "@/components/Loader";


interface TestCaseGenerate {
  id: string;
  code: string;
  language: string;
  test: string;
  createdAt: string;
}

// interface TestCaseGenerateDashboardProps {
//   userId: string;
// }

export default function TestCaseGenerateDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testCase, setTestCase] = useState<string | null>(null);
  const [testCases, setTestCases] = useState<TestCaseGenerate[]>([]);

  const [isCompleted,setIsCompleted] = useState(false)

  console.log("testCases", testCases);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch("/api/test");
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setTestCases(data);
      }
    } catch (error) {
      console.error("Failed to fetch test:", error);
    }
  };

  const handleSubmit = async (code: string, language: string) => {
    try {
      setLoading(true);
      setError(null);
      setIsCompleted(false)
     

      const response = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate test code , please try again!");
      }

      const data = await response.json();
      setIsCompleted(true)
      setTestCase(data);
      fetchTests();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async(id:string)=>{
      const response = await deleteTest(id)
      if(response.success){
        const filteredTests = testCases.filter(test=>test.id!==id)
        setTestCases(filteredTests)
      } 
  }
  return (
    <main className="container mx-auto px-4 my-12 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">AI Test Case Gen</h1>
      </div>

      <Tabs defaultValue="review">
        <TabsList>
          <TabsTrigger value="review">Generate New Test Case</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="review">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <CodeInput
                onSubmit={handleSubmit}
                isLoading={loading}
                isTestGen={true}
                isCompleted={isCompleted}
              />
            </div>

            <div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {testCase && (
                <ReviewResult testCase={testCase} isTestGen={true}/>
               
              )}
               {loading&& <Loader content='Please wait while generating the test cases...'/>}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <ReviewHistory testCases={testCases} isTestGen={true} handleDelete={handleDelete}/>
        </TabsContent>
      </Tabs>
    </main>
  );
}
