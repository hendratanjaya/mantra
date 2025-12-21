export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-16">
      <section className="max-w-3xl space-y-10 text-center">
        <h1 className="text-4xl font-extrabold text-foreground">
          About <span className="text-primary">Mantra</span>
        </h1>

        <p className="text-lg text-muted-foreground">
          Mantra is an adaptive learning platform designed to help users learn
          more effectively through personalized content, practice, and feedback.
        </p>

        <div className="space-y-6 text-left text-muted-foreground">
          <p>
            Traditional online learning platforms often deliver the same
            material to every learner, regardless of their prior knowledge,
            learning speed, or difficulties. This one-size-fits-all approach can
            lead to frustration, disengagement, or shallow understanding.
          </p>

          <p>
            Mantra trying to addresses this problem by continuously adapting
            learning paths based on user performance. By analyzing quiz results,
            hint usage, and learning behavior, the platform generates targeted
            remedial feedback or more advanced material when appropriate.
          </p>

          <p>
            The goal of Mantra is not just to test users, but to support
            understanding. AI-generated explanations and exercises are designed
            to reinforce core programming concepts while maintaining clarity,
            relevance, and pedagogical intent.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mt-16 text-sm text-muted-foreground text-center">
        <p>
          <strong>Disclaimer:</strong> Mantra utilizes AI-generated content to
          support personalized learning. While the system is designed to provide
          accurate and helpful explanations, AI-generated responses may
          occasionally be incorrect, incomplete, or imprecise. Users are
          encouraged to verify critical information and use the platform as a
          learning aid rather than a definitive source.
        </p>
      </section>
    </main>
  );
}
