'use client'

import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton,useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './MoodToggle';
import { useEffect, useState } from 'react';


export default function Navbar() {
 const  {user} = useUser()

 const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

   <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
  }`}>
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            CodeGuard
          </Link>
          
          {user && (
            <>
              <Link 
                href="/dashboard" 
                className="text-sm text-gray-600 "
              >
               Review Code
              </Link>

              <Link 
                href="/testsgen" 
                className="text-sm text-gray-600 "
              >
                Generate Test Case
              </Link>
              
            </>
          )}
          <Link 
                href="https://github.com/Nazim777" 
                className="text-sm text-gray-600 "
              >
              github
              </Link>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </>
          ) : (
           <>
            <UserButton afterSignOutUrl="/" />
            <ModeToggle/>
           </>
          )}
        </div>
      </div>
    </nav>
    </header>
  );
}