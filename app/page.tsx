import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Shield, Zap, FileCode } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-8 mt-10">
          AI-Powered Code Reviews & Test Case Generation
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Transform the way you write and review code. Detect bugs, optimize performance, and auto-generate comprehensive test cases with cutting-edge AI.
        </p>
        {!userId ? (
          <div className="flex justify-center gap-4">
            <SignInButton mode="modal">
              <Button size="lg">Get Started</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="lg" variant="outline">Sign Up</Button>
            </SignUpButton>
          </div>
        ) : (
          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        )}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-4 gap-10 mt-20">
        <div className="p-6 rounded-lg shadow-lg">
          <Code2 className="w-12 h-12 text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Smart Analysis</h2>
          <p className="text-gray-600">
            AI algorithms analyze code for bugs, style issues, and improvements.
          </p>
        </div>
        <div className="p-6 rounded-lg shadow-lg">
          <Shield className="w-12 h-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Security First</h2>
          <p className="text-gray-600">
            Identify vulnerabilities and get recommendations to secure your code.
          </p>
        </div>
        <div className="p-6 rounded-lg shadow-lg">
          <Zap className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Performance Tips</h2>
          <p className="text-gray-600">
            Get AI-powered insights on performance optimizations.
          </p>
        </div>
        <div className="p-6 rounded-lg shadow-lg">
          <FileCode className="w-12 h-12 text-purple-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">AI Test Case Generation</h2>
          <p className="text-gray-600">
            Automatically generate test cases to ensure robust and error-free code.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600  text-center py-20 mt-20 rounded-lg">
        <h2 className="text-4xl font-bold mb-6">Boost Productivity with AI-Driven Reviews</h2>
        <p className="text-xl mb-8">Start improving your code quality today with our AI-powered tools.</p>
        <SignUpButton mode="modal">
          <Button size="lg" variant="outline">
            Try for Free
          </Button>
        </SignUpButton>
      </div>

      {/* Testimonials Section */}
      <div className="mt-24">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 border rounded-lg">
            <p className="text-gray-700 mb-4">
              "This tool transformed our development workflow. The AI insights are incredibly accurate!"
            </p>
            <p className="text-blue-600 font-semibold">- John D.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <p className="text-gray-700 mb-4">
              "Auto-generating test cases saved us countless hours of manual work. Highly recommend!"
            </p>
            <p className="text-blue-600 font-semibold">- Sarah K.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <p className="text-gray-700 mb-4">
              "The security checks gave us peace of mind and ensured our app was ready for production."
            </p>
            <p className="text-blue-600 font-semibold">- David L.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-24 bg-gray-800 text-white py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-center">
          <p>&copy; 2025 AI Code Reviewer. All rights reserved.</p>
         
        </div>
      </footer>
    </div>
  );
}
