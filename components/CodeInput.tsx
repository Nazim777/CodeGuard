import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface CodeInputProps {
  onSubmit: (code: string, language: string) => void;
  isLoading: boolean;
  isTestGen?: boolean;
  isCompleted:boolean
}

export function CodeInput({ onSubmit, isLoading, isTestGen,isCompleted}: CodeInputProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
console.log(isCompleted?'completed':'not completed')

  useEffect(()=>{
  
    if(isCompleted){
      setCode('')
    }
  

  },[isCompleted])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code, language);
  };

  const languages = [
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "rust", label: "Rust" },
    { value: "go", label: "Go" },
  ];

  const languagesForTestGen = [
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {isTestGen
            ? "Submit Code for Generate Test Cases"
            : "Submit Code for Review"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {isTestGen ? (
                  <>
                    {languagesForTestGen.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>

            <textarea
              ref={inputRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-4 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste your code here..."
            />
          </div>

          <CardFooter className="px-0 pt-4">
            <Button
              type="submit"
              disabled={isLoading || !code}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Review Code"
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
