import { useState, useCallback } from "react";
import { Upload, CheckCircle2, FileText } from "lucide-react";

const UploadCard = ({ onFileUpload }: { onFileUpload: (file: File) => void }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) {
        setFile(f);
        onFileUpload(f);
      }
    },
    [onFileUpload]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      onFileUpload(f);
    }
  };

  return (
    <div className="card-medical p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        Genetic Data Upload
      </h3>
      <label
        className={`upload-zone flex flex-col items-center justify-center p-8 cursor-pointer ${
          dragging ? "dragging" : ""
        } ${file ? "border-accent bg-accent/5" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        aria-label="Upload genetic data file"
      >
        <input
          type="file"
          className="hidden"
          accept=".vcf,.json,.csv"
          onChange={handleChange}
          aria-label="Choose file"
        />
        {file ? (
          <div className="flex flex-col items-center gap-2 animate-scale-in">
            <CheckCircle2 className="w-10 h-10 text-accent" />
            <span className="text-sm font-medium text-foreground">{file.name}</span>
            <span className="text-xs text-muted-foreground">File validated</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className={`p-3 rounded-xl bg-primary/10 ${dragging ? "animate-scale-in" : ""}`}>
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Drop VCF / JSON / CSV file
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                or click to browse
              </p>
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

export default UploadCard;
