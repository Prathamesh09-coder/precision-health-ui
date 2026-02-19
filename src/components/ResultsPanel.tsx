import { ShieldCheck, AlertTriangle, OctagonAlert, HelpCircle } from "lucide-react";

export type RiskLevel = "safe" | "caution" | "danger" | "unknown";

interface DrugResult {
  drug: string;
  risk: RiskLevel;
  recommendation: string;
}

const riskConfig: Record<RiskLevel, { className: string; icon: React.ReactNode; label: string }> = {
  safe: {
    className: "risk-safe",
    icon: <ShieldCheck className="w-6 h-6" />,
    label: "Safe to Use",
  },
  caution: {
    className: "risk-warning",
    icon: <AlertTriangle className="w-6 h-6" />,
    label: "Adjust Dosage",
  },
  danger: {
    className: "risk-danger",
    icon: <OctagonAlert className="w-6 h-6" />,
    label: "Contraindicated",
  },
  unknown: {
    className: "risk-unknown",
    icon: <HelpCircle className="w-6 h-6" />,
    label: "Insufficient Data",
  },
};

const ResultsPanel = ({ results }: { results: DrugResult[] }) => {
  if (results.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">
        Interaction Analysis Results
      </h3>
      <div className="grid gap-3">
        {results.map((result, i) => {
          const config = riskConfig[result.risk];
          return (
            <div
              key={result.drug}
              className={`${config.className} rounded-2xl p-5 text-primary-foreground animate-slide-up-fade`}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-white/20">{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-base">{result.drug}</h4>
                    <span className="text-xs font-medium bg-white/20 px-2.5 py-1 rounded-full">
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsPanel;
export type { DrugResult };
