import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
import { jsonrepair } from 'jsonrepair';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { code, language } = await request.json();

        const prompt = `
    Perform a comprehensive code review of the following ${language} code. Analyze for:

    1. Bugs and Issues:
       - Syntax errors
       - Logic bugs
       - Edge cases
       - Security vulnerabilities

    2. Code Quality:
       - Clean code principles
       - Best practices
       - Code organization
       - Naming conventions

    3. Performance:
       - Time complexity
       - Space complexity
       - Resource usage
       - Optimization opportunities

    4. Maintainability:
       - Documentation needs
       - Test coverage suggestions
       - Refactoring opportunities

    Format the response as JSON with the following structure:
    {
      "bugs": ["List each bug as a string, without wrapping in objects"],
      "suggestions": ["Provide specific suggestions as plain strings"],
      "optimizations": ["List performance improvements directly as strings"],
      "security": ["Identify security issues as plain text"],
      "maintainability": ["List maintainability improvements as strings"]
      "solution_code": "Provide the corrected version of the code here as a plain string. Ensure the solution reflects fixes for all identified issues."
    }

    Avoid returning objects with 'description' keys. Each item in the arrays should be plain text.
    Solution_code must be plain string.
    Ensure the JSON is properly escaped and does not include code block markers. Return only valid JSON.

    Code to review:
    ${code}
    `;

    

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    let review
    try {
      const cleanText = text.replace(/^```json\s*|\s*```$/g, "");
      const repairedText = jsonrepair(cleanText);
      review = JSON.parse(repairedText);
    } catch (error) {
      console.error("Failed to repair and parse response:", error);
    }
    
     await prisma.codeReview.create({
      data: {
        code,
        language,
        review,
        userId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error in code review:", error);
    return NextResponse.json(
      { error: "Failed to process code review" },
      { status: 500 }
    );
  }
}



