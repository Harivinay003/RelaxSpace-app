# Relax Space

Relax Space is a modern, feature-rich guided meditation application designed to help users find tranquility, focus, and mindfulness. Built with a powerful stack including Next.js, Firebase, and Genkit, it offers a serene and personalized user experience.

## Features

- **User Authentication**: Secure user sign-up, login, and password reset functionality powered by Firebase Authentication.
- **Personalized Dashboard**: A welcoming dashboard that greets users and provides a quick overview of their stats and shortcuts to key features.
- **Guided Meditation Library**: A curated collection of guided meditations for various goals like stress relief, focus, and sleep. Includes a dedicated audio player page.
- **Ambient Soundscapes**: A selection of background sounds (e.g., rain, waves) that can be played individually to create a calming atmosphere.
- **Unguided Meditation Timer**: A simple, clean timer for users who prefer unguided meditation sessions.
- **AI-Powered Prompts**: Leverages Genkit and Google's AI to generate personalized meditation prompts based on the user's current mood and goals.
- **Session Tracking & Progress**: Automatically logs all completed sessions (guided, timer) to Firestore. Users can view their history, total time meditated, and see their progress over time with charts.
- **Onboarding Experience**: A welcoming tour for new users to guide them through the app's features and a prompt to set a username for a personalized touch.
- **Light & Dark Mode**: A theme toggle for a comfortable viewing experience at any time of day.
- **Fully Responsive**: A mobile-first design that works beautifully across all devices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Authentication & Database**: [Firebase](https://firebase.google.com/) (Auth and Firestore)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) (with Google AI)
- **State Management**: React Hooks & Context API
- **Charts**: [Recharts](https://recharts.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Firebase Configuration:**
    The project is pre-configured to connect to a Firebase project. The configuration is located in `src/lib/firebase.ts`. No changes are needed to run the application as-is.

### Running the Application

This project uses two separate development servers: one for the Next.js frontend and another for the Genkit AI flows.

1.  **Start the Next.js development server:**
    This command runs the main web application.
    ```bash
    npm run dev
    ```
    The app will be available at [http://localhost:9002](http://localhost:9002).

2.  **Start the Genkit development server:**
    In a separate terminal, run this command to start the Genkit server, which makes the AI flows available for the frontend to call.
    ```bash
    npm run genkit:dev
    ```
    This will start the Genkit development UI, typically on port 4000, where you can inspect and test your flows.

## Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run genkit:dev`: Starts the Genkit development flow server.
- `npm run build`: Builds the Next.js application for production.
- `npm run start`: Starts the production Next.js server.
- `npm run lint`: Lints the project files using Next.js's built-in ESLint configuration.
