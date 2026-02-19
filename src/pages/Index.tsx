import { useState } from "react";
import { FlaskConical } from "lucide-react";
import Navbar from "@/components/Navbar";
import UploadCard from "@/components/UploadCard";
import DrugSelector from "@/components/DrugSelector";
import ResultsPanel, { type DrugResult } from "@/components/ResultsPanel";
import PharmacogenomicProfile from "@/components/PharmacogenomicProfile";
import AIExplanation from "@/components/AIExplanation";
import JSONViewer from "@/components/JSONViewer";
import LoadingState from "@/components/LoadingState";

const MOCK_VARIANTS = [
  { id: "rs1045642", gene: "ABCB1", effect: "Altered drug transport activity" },
  { id: "rs4149056", gene: "SLCO1B1", effect: "Reduced hepatic uptake of statins" },
  { id: "rs9923231", gene: "VKORC1", effect: "Increased warfarin sensitivity" },
  { id: "rs1799853", gene: "CYP2C9", effect: "Poor metabolizer phenotype" },
  { id: "rs4244285", gene: "CYP2C19", effect: "Loss of function allele" },
  { id: "rs28399504", gene: "CYP2D6", effect: "Reduced enzyme activity" },
];

const getMockResults = (drugs: string[]): DrugResult[] =>
  drugs.map((drug) => {
    const risks: Record<string, { risk: DrugResult["risk"]; rec: string }> = {
      Warfarin: {
        risk: "caution",
        rec: "VKORC1 variant rs9923231 detected. Recommend reduced initial dose (3mg/day) with frequent INR monitoring. CYP2C9*2 allele may further slow metabolism.",
      },
      Clopidogrel: {
        risk: "danger",
        rec: "CYP2C19 loss-of-function allele rs4244285 detected. Patient is a poor metabolizer — clopidogrel will have significantly reduced efficacy. Consider prasugrel or ticagrelor.",
      },
      Codeine: {
        risk: "danger",
        rec: "CYP2D6 reduced activity (rs28399504). Codeine cannot be converted to morphine effectively. Analgesic effect will be minimal. Consider alternative analgesics.",
      },
      Simvastatin: {
        risk: "caution",
        rec: "SLCO1B1 variant rs4149056 detected. Increased risk of statin-induced myopathy. Consider lower dose or alternative statin (pravastatin, rosuvastatin).",
      },
    };
    const match = risks[drug];
    if (match) return { drug, risk: match.risk, recommendation: match.rec };
    return {
      drug,
      risk: "safe" as const,
      recommendation: `No significant pharmacogenomic interactions detected for ${drug} based on the analyzed genetic variants. Standard dosing guidelines apply.`,
    };
  });

const MOCK_EXPLANATION = `Based on the patient's pharmacogenomic profile, the CYP2C19 gene shows a loss-of-function variant (rs4244285) that significantly impacts prodrug activation. The CYP2D6 enzyme activity is reduced due to rs28399504, affecting opioid metabolism. VKORC1 sensitivity combined with CYP2C9 poor metabolizer status creates a compounded risk for warfarin therapy. The SLCO1B1 transporter variant reduces hepatic statin uptake, increasing systemic exposure and myopathy risk. These findings are consistent with CPIC guidelines for dose adjustment.`;

const MOCK_GENES = ["CYP2C19", "CYP2D6", "VKORC1", "CYP2C9", "SLCO1B1", "ABCB1", "CPIC"];

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [drugs, setDrugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DrugResult[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const canAnalyze = file && drugs.length > 0 && !loading;

  const handleAnalyze = () => {
    setLoading(true);
    setResults([]);
    setAnalyzed(false);
    setTimeout(() => {
      setResults(getMockResults(drugs));
      setLoading(false);
      setAnalyzed(true);
    }, 3000);
  };

  const jsonData = analyzed
    ? {
        patient_id: "PGX-2024-00847",
        variants_detected: MOCK_VARIANTS.length,
        drugs_analyzed: drugs,
        results: results.map((r) => ({
          drug: r.drug,
          risk_level: r.risk,
          recommendation: r.recommendation,
        })),
        model_version: "v2.4.1-clinical",
        confidence: 0.94,
      }
    : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column – Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <UploadCard onFileUpload={setFile} />
            <DrugSelector selected={drugs} onChange={setDrugs} />
            <button
              disabled={!canAnalyze}
              onClick={handleAnalyze}
              className="btn-lift w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:pointer-events-none transition-all lg:block hidden"
              aria-label="Analyze interactions"
            >
              <span className="flex items-center justify-center gap-2">
                <FlaskConical className="w-4 h-4" />
                Analyze Interactions
              </span>
            </button>
          </div>

          {/* Right column – Results */}
          <div className="lg:col-span-3 space-y-6">
            {loading && <LoadingState />}
            {!loading && !analyzed && (
              <div className="card-medical flex flex-col items-center justify-center py-20 text-center">
                <div className="p-4 rounded-2xl bg-muted/50 mb-4">
                  <FlaskConical className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Ready for Analysis
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Upload a genetic data file and select drugs to analyze
                  pharmacogenomic interactions.
                </p>
              </div>
            )}
            {!loading && analyzed && (
              <div className="space-y-6">
                <div className="animate-slide-up-fade">
                  <ResultsPanel results={results} />
                </div>
                <div className="animate-slide-up-fade" style={{ animationDelay: "150ms", animationFillMode: "both" }}>
                  <PharmacogenomicProfile variants={MOCK_VARIANTS} />
                </div>
                <div className="animate-slide-up-fade" style={{ animationDelay: "250ms", animationFillMode: "both" }}>
                  <AIExplanation explanation={MOCK_EXPLANATION} genes={MOCK_GENES} />
                </div>
                {jsonData && (
                  <div className="animate-slide-up-fade" style={{ animationDelay: "350ms", animationFillMode: "both" }}>
                    <JSONViewer data={jsonData} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile sticky analyze button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 glass-nav z-40">
          <button
            disabled={!canAnalyze}
            onClick={handleAnalyze}
            className="btn-lift w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:pointer-events-none transition-all"
            aria-label="Analyze interactions"
          >
            <span className="flex items-center justify-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Analyze Interactions
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
