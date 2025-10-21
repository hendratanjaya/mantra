import Link from "next/link";

// landing page
export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center bg-background text-center px-6">
      <section className="max-w-3xl">
        <h1 className="text-5xl font-extrabold leading-tight text-foreground mb-6">
          Build your skills with the power of{" "}
          <span className="text-primary">Mantra</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10">
          A personalized learning platform that adapts to your progress, helping
          you grow smarter and faster as a programmer.
        </p>
        <div className="flex justify-center">
          <Link
            href="/login"
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
