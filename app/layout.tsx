import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { ThemeProvider } from "@/components/theme-provider"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <ClerkProvider>
      
      <html lang="en">
        <body> 
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen ">
            {children}
          </main>
          </ThemeProvider>
        </body>
      </html>
    
    </ClerkProvider>
   
  );
}