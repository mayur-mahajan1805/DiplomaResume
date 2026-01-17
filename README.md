# CareerCompass AI: AI Resume Screening & Career Guidance System

## 1. Project Overview

CareerCompass AI is a full-stack, AI-powered system. The application assists users in their career development by analyzing their resumes, providing tailored job recommendations, identifying skill gaps, and offering personalized career advice through an interactive chat interface.

The core mission is to leverage ethical and transparent AI to empower job seekers, helping them navigate the job market more effectively and achieve their career aspirations.

### Core Features:
- **AI-Powered Resume Analysis**: Extracts skills, work experience, and education from resumes using advanced AI.
- **Intelligent Job Recommendations**: Matches user profiles to suitable job roles and provides a skill-match percentage.
- **Skill Gap Analysis**: Identifies missing competencies for desired roles and suggests learning resources.
- **Interactive Career Advisor Chat**: An AI chatbot for users to ask career-related questions.
- **Professional User Interface**: A clean, modern, and responsive UI built with Next.js and shadcn/ui.

## 2. Technical Innovation and Skills Demonstrated

This project showcases cutting-edge development practices and advanced technical skills, positioning it as a standout portfolio piece for full-stack AI engineers:

- **AI Engineering Excellence**: Leverages Genkit's flow-based architecture with Google's Gemini 2.0 models, implementing structured prompts and Zod-validated schemas for type-safe AI interactions. Demonstrates expertise in prompt engineering and AI workflow orchestration for reliable, production-ready outputs.

- **Modern Full-Stack Mastery**: Built on Next.js 15 with App Router, utilizing server actions for API-less backend logic. Employs TypeScript throughout for end-to-end type safety, reducing runtime errors and improving developer experience.

- **Component-Driven UI Architecture**: Implements a comprehensive design system using shadcn/ui atop Radix UI primitives, ensuring accessibility (WCAG compliant) and customization. Integrates Tailwind CSS with advanced animations via Framer Motion and GSAP for smooth, professional user interactions.

- **Data Processing and Visualization**: Handles PDF parsing with pdf-parse for resume text extraction, coupled with Recharts for dynamic data visualization. Features complex state management for multi-step user workflows involving file uploads, AI processing pipelines, and result rendering.

- **Real-Time User Experience**: Develops an interactive chat interface with async AI responses, error handling via toast notifications, and responsive design. Incorporates advanced React patterns like custom hooks, context providers, and optimized re-renders.

- **Scalability and Performance**: Uses Firebase for potential backend services, implements lazy loading and code splitting in Next.js, and optimizes for SEO and performance. Demonstrates knowledge of modern deployment practices with Vercel-compatible architecture.

- **Ethical AI Implementation**: Incorporates fairness prompts to mitigate biases, includes user disclaimers, and ensures transparent AI decision-making processes.

This project not only solves real-world career guidance challenges but also demonstrates the ability to architect, implement, and deploy sophisticated AI-powered applications, making it an exceptional showcase of full-stack development prowess in the AI era.

## 3. System Architecture

The application is built on a modern technology stack, ensuring a clear separation of concerns between the frontend, backend logic, and the AI layer.

- **Frontend**:
  - **Framework**: Next.js (React) with App Router
  - **UI Components**: shadcn/ui
  - **Styling**: Tailwind CSS
  - **Language**: TypeScript

- **Backend (Integrated via Next.js)**:
  - **Runtime**: Node.js
  - **Server Logic**: Next.js Server Actions and API Routes
  - **Functionality**: Handles AI flow invocations, business logic, and data processing.

- **AI Layer**:
  - **Provider**: Genkit with Google's Gemini models.
  - **Core Logic**: Implemented as server-side Genkit flows for:
    - Resume Parsing & Skill Extraction
    - Job Role Recommendation
    - Skill Gap Identification
    - Career Question Answering

## 4. AI Agent Logic: Input → Process → Output

The system's intelligence is driven by a core "AI Resume Screening & Career Guidance Agent" composed of several specialized AI flows.

### a. Resume Analysis
- **Input**: Raw text from the user's resume.
- **Process**: The AI is prompted to act as an expert resume parser. It analyzes the text to identify and categorize information.
- **Output**: A structured JSON object containing:
  - `skills`: An array of technical and soft skills.
  - `experience`: A summary of work history.
  - `education`: A summary of academic qualifications.

### b. Job Recommendation
- **Input**: The array of skills extracted from the resume.
- **Process**: The AI compares the user's skills against a vast internal knowledge base of job roles and their required competencies. It calculates a "match percentage" for each potential role.
- **Output**: A list of 3-5 recommended job roles, each with:
  - `jobRole`: The title of the job.
  - `matchPercentage`: The calculated skill alignment score.
  - `explanation`: A transparent rationale for the recommendation.

### c. Skill Gap Analysis
- **Input**: The user's resume text and a selected job role.
- **Process**: The AI performs a comparative analysis, identifying key skills required for the target job role that are not present in the user's resume.
- **Output**: A detailed analysis including:
  - `missingSkills`: A list of skills to acquire.
  - `learningResources`: Suggestions for courses, articles, or platforms to learn the missing skills.
  - `reasoning`: An explanation of why these skills are important for the role.

## 5. Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables. Create a `.env.local` file in the root of the project and add your Google AI API Key:
    ```
    GOOGLE_API_KEY="your_google_ai_api_key"
    ```

### Running the Application
1.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

2.  (Optional) Run the Genkit flows in a separate terminal for debugging:
    ```bash
    npm run genkit:watch
    ```

## 6. Ethical AI Considerations

We are committed to the responsible use of AI. The following principles are embedded in our design:

- **Transparency**: The AI provides clear explanations for its recommendations, ensuring users understand the "why" behind the guidance.
- **Fairness**: The models are prompted to avoid biases related to gender, ethnicity, or background, focusing solely on skills and qualifications.
- **Disclaimer**: The application includes a clear disclaimer that AI-generated advice should be used as a supportive tool, not as an absolute judgment. Users are encouraged to combine AI insights with their own research and professional advice.

## 7. Future Enhancements

- **User Authentication**: Implement user accounts to save and track career development over time.
- **Database Integration**: Store user data, resumes, and analysis history in a MongoDB database.
- **Real-time Job Postings**: Integrate with job APIs (e.g., LinkedIn, Indeed) to match users with live job openings.
- **Interactive Roadmap**: Visualize the career roadmap with clickable milestones and progress tracking.
- **Advanced PDF Parsing**: Enhance the PDF parser to handle complex layouts and graphical elements.
