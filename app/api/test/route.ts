import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { code, language } = await request.json();

    const prompt = `
    Generate unit tests for the following ${language} code. Ensure that:
    
    1. Test Coverage:
       - Write unit tests for each function, class, or component.
       - Cover normal, edge, and error cases.
       - Ensure tests handle invalid inputs and exceptions.
    
    2. Testing Framework:
       - Use the standard testing framework for ${language} (e.g., Jest for JavaScript, PyTest for Python).
       - Mock external dependencies if necessary.
    
    3. Assertions:
       - Use appropriate assertions to verify function outputs.
       - Test for both positive and negative scenarios.
    
    4. Structure:
       - Organize tests in a dedicated test file or within the same file using describe and it/test blocks.
       - Ensure clear naming conventions and readability.
    
    Return the unit tests as a plain string.
    
    Code to test:
    ${code}
    `;
    

    

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    let responseText
    if(language==='typescript'){
      responseText = response.text().replace(/^```typescript\s*|\s*```$/g, "");

    }else if(language==='javascript'){
      responseText = response.text().replace(/^```javascript\s*|\s*```$/g, "");

    }else{
      responseText = response.text().replace(/^```python\s*|\s*```$/g, "");
    }
    
    await prisma.testCase.create({
      data: {
        code,
        language,
        test:responseText,
        userId,
      },
    });
   

    return NextResponse.json(responseText);
  } catch (error) {
    console.error("Error in code review:", error);
    return NextResponse.json(
      { error: "Failed to process code review" },
      { status: 500 }
    );
  }
}


export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const tests = await prisma.testCase.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
  
  return NextResponse.json(tests);
}