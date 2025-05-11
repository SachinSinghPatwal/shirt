import React, { useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Upload, X } from "lucide-react";
import { cn } from "../utils/cn";
import { inputStyles } from "../utils/theme-utils";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  defaultImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageChange,
  defaultImage,
}) => {
  const { theme } = useTheme();
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    } else {
      setPreview(defaultImage || null);
      onImageChange(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] || null;
    handleFile(file);
  };

  const clearImage = () => {
    setPreview(defaultImage || null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">T-shirt Design</label>

      <div
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all duration-200 min-h-[250px]",
          isDragging ? "border-blue-500 bg-blue-50" : inputStyles({ theme }),
          theme === "dark" && isDragging && "bg-blue-900/20"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={preview}
              alt="T-shirt design preview"
              className="max-h-[230px] max-w-full object-contain rounded"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
              className={cn(
                "absolute top-0 right-0 bg-gray-800/70 text-white rounded-full p-1",
                "hover:bg-red-500/70 transition-colors"
              )}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <Upload
              className={cn(
                "mb-2 h-10 w-10",
                theme === "minimal"
                  ? "text-gray-400"
                  : theme === "vibrant"
                  ? "text-purple-400"
                  : "text-gray-500"
              )}
            />
            <p className="text-sm font-medium mb-1">
              Drag and drop your design here
            </p>
            <p
              className={cn(
                "text-xs",
                theme === "minimal"
                  ? "text-gray-500"
                  : theme === "vibrant"
                  ? "text-purple-500"
                  : "text-gray-400"
              )}
            >
              or click to browse
            </p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      <p
        className={cn(
          "text-xs mt-1",
          theme === "minimal"
            ? "text-gray-500"
            : theme === "vibrant"
            ? "text-purple-500"
            : "text-gray-400"
        )}
      >
        Supported formats: JPG, PNG, SVG
      </p>
    </div>
  );
};

export default ImageUpload;
