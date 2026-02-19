import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Variant {
  id: string;
  gene: string;
  effect: string;
}

const PharmacogenomicProfile = ({ variants }: { variants: Variant[] }) => {
  if (variants.length === 0) return null;

  return (
    <div className="card-medical p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Pharmacogenomic Profile
      </h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <Tooltip key={v.id}>
            <TooltipTrigger asChild>
              <span className="variant-badge cursor-help">
                {v.id}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[220px]">
              <p className="font-semibold text-xs">{v.gene}</p>
              <p className="text-xs text-muted-foreground">{v.effect}</p>
              <p className="text-[10px] text-muted-foreground mt-1 italic">
                Single nucleotide polymorphism
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default PharmacogenomicProfile;
