import { Dna } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const LoadingState = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 8;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 animate-fade-in">
      <div className="animate-dna-spin">
        <Dna className="w-14 h-14 text-primary" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold text-foreground">
          Analyzing Genetic Variants
        </p>
        <p className="text-xs text-muted-foreground max-w-xs">
          Evaluating drug metabolism pathways and pharmacogenomic interactions...
        </p>
      </div>
      <div className="w-64">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default LoadingState;
