import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";

const JSONViewer = ({ data }: { data: object }) => {
  const [copied, setCopied] = useState(false);
  const jsonStr = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-medical overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Raw Response</span>
        </div>
        <button
          onClick={handleCopy}
          className="btn-lift flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-foreground"
          aria-label="Copy JSON"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <div className="code-block p-5 max-h-64 overflow-auto">
        <pre className="text-xs leading-relaxed whitespace-pre-wrap">{jsonStr}</pre>
      </div>
    </div>
  );
};

export default JSONViewer;
