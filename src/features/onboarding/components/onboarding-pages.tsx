// Onboarding pages.

import { Button } from "@/shared/ui/button";

// These pages guide users through the onboarding process, highlighting key features and benefits.
export type Page = {
    title: string;
    description: string;
    content?: React.ReactNode;
    image?: React.ReactNode;
}

const pages: Page[] = [
  {
    title: "Welcome to Europa",
    description: "Your personal space for structured self-learning. Stay organized, track progress, and grow your knowledge.",
  },
  {
    title: "Track Your Topics",
    description: "Create topics for anything you want to learn — from coding to cooking. Set goals and milestones along the way.",
  },
  {
    title: "Organize Resources",
    description: "Save links, videos, books, and notes in one place. Keep your learning materials tidy and easy to find.",
  },
  {
    title: "Stay Motivated",
    description: "Use streaks, progress tracking, and weekly reflections to build consistency and celebrate your wins.",
  },
  {
    title: "Get Started",
    description: "Let’s set up your first topic and learning goal.",
    // optional call-to-action content:
    content: (
        <Button className="w-full" size={"lg"}>
            Start your first topic!
        </Button>
    )
  }
]

export default pages
