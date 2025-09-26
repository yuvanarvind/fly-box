import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
  disabled?: boolean;
  value?: File | null;
  onClear?: () => void;
}

export function FileUpload({
  onFileSelect,
  maxSize = 52428800, // 50MB default
  accept,
  disabled = false,
  value,
  onClear,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    disabled,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const hasError = fileRejections.length > 0;
  const errorMessage = fileRejections[0]?.errors[0]?.message;

  return (
    <div className="w-full">
      {!value && (
        <div
          {...getRootProps()}
          className={cn(
            "relative cursor-pointer rounded-xl border-2 border-dashed p-8 transition-colors",
            "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            isDragActive || dragActive 
              ? "border-primary bg-accent/50" 
              : "border-neutral-300",
            hasError && "border-destructive bg-destructive/5",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className={cn(
              "rounded-full p-4",
              isDragActive || dragActive ? "bg-primary/10" : "bg-muted"
            )}>
              <Upload className={cn(
                "h-8 w-8",
                isDragActive || dragActive ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isDragActive ? "Drop your file here" : "Choose a file or drag & drop"}
              </p>
              <p className="text-sm text-muted-foreground">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
            </div>
          </div>
        </div>
      )}

      {value && (
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-accent/50 p-2">
                <File className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium">{value.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(value.size)}
                </p>
              </div>
            </div>
            {onClear && (
              <button
                onClick={onClear}
                className="rounded-lg p-2 hover:bg-muted"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {hasError && (
        <p className="mt-2 text-sm text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}