"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContext } from "react";
import { UserProviderContext } from "../../_providers/user-provider";

export function HomePage({
  summaries,
  courses,
}: {
  summaries: number;
  courses: number;
}) {
  const userContext = useContext(UserProviderContext);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold">
          Hello, {userContext?.user?.username}{" "}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a quick look at what you have.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <OverviewCard title="Summaries" count={summaries} href="/summaries" />
        <OverviewCard title="Courses" count={courses} href="/course" />
      </div>

      {/* Getting Started */}
      <GettingStarted />
      <PersonaInfo />
    </div>
  );
}

function OverviewCard({
  title,
  count,
  href,
}: {
  title: string;
  count: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-muted/30 relative rounded-lg border p-6 transition
                 hover:shadow-md hover:border-foreground/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-semibold">{count}</p>
        </div>

        <ArrowRight
          className="h-5 w-5 text-muted-foreground transition-transform
                     group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

function GettingStarted() {
  return (
    <div className="rounded-lg border bg-muted/30 p-6">
      <h2 className="text-lg font-semibold mb-2">Getting started</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Here&apos;s how to make the most out of Mantra.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Step
          title="Create summaries"
          description="Turn long materials into short, reusable notes."
        />
        <Step
          title="Enroll in courses"
          description="Practice concepts through guided exercises."
        />
      </div>

      <div className="mt-6">
        <Link
          href="/summaries"
          className="inline-flex items-center text-sm font-medium  hover:underline"
        >
          Create your first summary →
        </Link>
      </div>
    </div>
  );
}

function Step({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-md bg-background p-4 border">
      <p className="font-medium text-sm mb-1">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
function PersonaInfo() {
  return (
    <div className="rounded-lg border bg-muted/30 p-6 flex gap-4">
      <div className="flex-shrink-0 text-primary">
        {/* simple accent dot / icon substitute */}
        <div className="h-10 w-10 rounded-full ring-1 bg-primary/10 flex items-center justify-center font-semibold">
          AI
        </div>
      </div>

      <div className="flex-1">
        <p className="font-medium mb-1">Customize your assistant</p>
        <p className="text-sm text-muted-foreground mb-3">
          Choose how your assistant talks, explains, and reacts — from calm and
          professional to playful and expressive.
        </p>

        <Link
          href="/setting"
          className="inline-flex items-center text-sm font-medium hover:underline"
        >
          Customize persona →
        </Link>
      </div>
    </div>
  );
}
