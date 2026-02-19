import { useState, useRef, useEffect } from "react";
import { Search, X, Pill } from "lucide-react";

const DRUG_OPTIONS = [
  "Warfarin", "Clopidogrel", "Codeine", "Tamoxifen", "Simvastatin",
  "Omeprazole", "Metoprolol", "Fluorouracil", "Irinotecan", "Abacavir",
  "Carbamazepine", "Phenytoin", "Tacrolimus", "Mercaptopurine", "Azathioprine",
];

const DrugSelector = ({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (drugs: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = DRUG_OPTIONS.filter(
    (d) =>
      d.toLowerCase().includes(search.toLowerCase()) && !selected.includes(d)
  );

  return (
    <div className="card-medical p-6" ref={ref}>
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Pill className="w-4 h-4 text-secondary" />
        Drug Selection
      </h3>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selected.map((drug) => (
            <span
              key={drug}
              className="chip bg-primary/10 text-primary border border-primary/20"
            >
              {drug}
              <button
                onClick={() => onChange(selected.filter((d) => d !== drug))}
                className="ml-1 hover:text-destructive transition-colors"
                aria-label={`Remove ${drug}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          placeholder="Search drugs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search drugs"
        />
      </div>

      {open && filtered.length > 0 && (
        <div className="mt-2 rounded-xl border border-border bg-card shadow-lg max-h-48 overflow-y-auto">
          {filtered.map((drug) => (
            <button
              key={drug}
              className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary/5 transition-colors first:rounded-t-xl last:rounded-b-xl"
              onClick={() => {
                onChange([...selected, drug]);
                setSearch("");
                setOpen(false);
              }}
            >
              {drug}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DrugSelector;
