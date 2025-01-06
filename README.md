# AI Code Review and Test Case Generator  

AI-powered tool that automates code reviews and generates comprehensive test cases, ensuring high-quality, optimized, and secure code.  

## 🚀 Features  

### 1. Comprehensive Bug Detection  
- Scans code for **syntax errors**, **logic bugs**, and **edge cases**.  
- Identifies **security vulnerabilities** to ensure safe and reliable code.  

### 2. AI-Driven Code Quality Analysis  
- Reviews code for **clean code principles** and **best practices**.  
- Assesses **code organization** and **naming conventions** for enhanced readability and structure.  

### 3. Performance Optimization  
- Detects **performance bottlenecks** by analyzing **time and space complexity**.  
- Provides **resource optimization** suggestions to improve overall execution efficiency.  

### 4. Maintainability Recommendations  
- Highlights areas for **documentation** and **test coverage** improvements.  
- Suggests **refactoring opportunities** to enhance long-term maintainability.  

### 5. Security Vulnerability Assessment  
- Evaluates the code for **security risks** and **potential vulnerabilities** to ensure robust software.  

### 6. Automated Test Case Generation  
- Automatically generates **unit tests** to cover edge cases and improve reliability.  
- Proposes test cases aligned with **performance** and **security** improvements.  

---

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for building the frontend and API routes
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Clerk](https://clerk.com/) - Authentication and user management
- [Google Generative AI](https://ai.google.dev/) - AI model for content generation
- [Prisma ORM](https://www.prisma.io/) - TypeScript ORM for database management
- [Neon Database](https://neon.tech/) - Serverless Postgres database
- [Lucide React](https://lucide.dev/) - Icon library

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Nazim777/CodeGuard.git
   cd CodeGuard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   DATABASE_URL=your_neon_database_url
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Migreate the database

   ```bash
   npx prisma migrate dev --name init
   ```
6. Generate prisma client

   ```bash
   npx prisma generate
  ```
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```