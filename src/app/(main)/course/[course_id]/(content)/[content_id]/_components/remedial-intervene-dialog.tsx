import { QuizResult } from "@/app/(main)/course/_stores/use-learning-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Markdown from "react-markdown";

export function RemedialInterveneDialog({
  open,
  isEvaluating,
  performance,
  intervention,
  isGenerating,
  isRedirecting,
  onContinue,
}: {
  open: boolean;
  isEvaluating: boolean;
  performance: QuizResult | null;
  intervention: string | null;
  isGenerating: boolean;
  isRedirecting: boolean;
  onContinue: () => void;
}) {
  const showPerformance = !!performance && !isEvaluating;
  const showIntervention = !!intervention && !isEvaluating;
  const isBusy = isEvaluating || isGenerating || isRedirecting;

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg max-h-[70vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Learning Progress Review</DialogTitle>
        </DialogHeader>

        {/* PERFORMANCE SUMMARY */}
        {showPerformance && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Accuracy</span>
              <span className="font-medium">
                {(performance.accuracy * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hints used</span>
              <span className="font-medium">{performance.hintsUsed}</span>
            </div>
          </div>
        )}

        {isEvaluating && (
          <div className="mt-6 flex items-center gap-3 text-muted-foreground">
            <span className="animate-spin h-4 w-4 rounded-full border-2 border-t-transparent" />
            <span>Analyzing your performance…</span>
          </div>
        )}

        {showIntervention && (
          <div className="mt-6 prose prose-sm max-w-none">
            <Markdown>{intervention}</Markdown>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button onClick={isBusy ? undefined : onContinue} disabled={isBusy}>
            {isEvaluating
              ? "Evaluating…"
              : isGenerating
              ? "Generating next lesson…"
              : isRedirecting
              ? "Redirecting…"
              : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
