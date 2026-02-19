import { useState } from "react";
import { Brain, ChevronDown } from "lucide-react";

interface AIExplanationProps {
  explanation: string;
  genes: string[];
}

const AIExplanation = ({ explanation, genes }: AIExplanationProps) => {
  const [open, setOpen] = useState(false);

  const highlightGenes = (text: string) => {
    let result = text;
    genes.forEach((gene) => {
      result = result.replace(
        new RegExp(`\\b(${gene})\\b`, "gi"),
        `<strong class="text-primary font-semibold">$1</strong>`
      );
    });
    return result;
  };

  return (
    <div className="card-medical overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-primary/[0.02]"
        aria-expanded={open}
        aria-label="Toggle AI explanation"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Explainable AI</h3>
            <p className="text-xs text-muted-foreground">
              Model reasoning & evidence
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-0">
          <div className="rounded-xl bg-muted/50 p-4 border border-border">
            <p
              className="text-sm text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightGenes(explanation) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIExplanation;
