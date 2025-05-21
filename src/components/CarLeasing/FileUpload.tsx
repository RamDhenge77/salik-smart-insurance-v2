import React, { useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  errorMessage?: string;
}

const FileUpload = ({
  label,
  accept,
  onChange,
  errorMessage,
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onChange(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/50"
        } transition-colors cursor-pointer`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`file-upload-${label}`)?.click()}
      >
        <input
          id={`file-upload-${label}`}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          {fileName ? (
            <span className="text-sm text-gray-700 truncate max-w-full">
              {fileName}
            </span>
          ) : (
            <>
              <p className="text-sm text-gray-500">
                <span className="text-primary font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG or PNG (max. 5MB)
              </p>
            </>
          )}
        </div>
      </div>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default FileUpload;
