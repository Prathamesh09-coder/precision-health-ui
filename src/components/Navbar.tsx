import { Dna, Activity } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="glass-nav sticky top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
            <Dna className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              PharmacoGx
            </h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wide uppercase">
              Pharmacogenomic Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="w-4 h-4" />
            <span>Clinical Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-accent pulse-dot" />
              <span className="relative block w-2.5 h-2.5 rounded-full bg-accent" />
            </div>
            <span className="text-sm font-medium text-foreground">System Ready</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
