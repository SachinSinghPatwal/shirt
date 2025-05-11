import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { cn } from "../utils/cn";

interface TShirtPreviewProps {
  designImage: string | null;
  texts: string[];
  physicalAttributes: {
    height: number;
    weight: number;
    build: string;
  };
}

const TShirtPreview: React.FC<TShirtPreviewProps> = ({
  designImage,
  texts,
  physicalAttributes,
}) => {
  const { theme } = useTheme();

  // Use a default t-shirt image if no design is provided
  const defaultTShirtImage =
    "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

  // Map physical attributes to visual adjustments for the preview
  const getBuildClass = () => {
    switch (physicalAttributes.build) {
      case "lean":
        return "scale-[0.9]";
      case "regular":
        return "scale-[1.0]";
      case "athletic":
        return "scale-[1.05]";
      case "big":
        return "scale-[1.1]";
      default:
        return "scale-[1.0]";
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={cn(
          "relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden transition-transform duration-300",
          getBuildClass()
        )}
      >
        {/* T-shirt base image */}
        <img
          src={defaultTShirtImage}
          alt="T-shirt preview"
          className="w-full h-full object-cover"
        />

        {/* Design overlay */}
        {designImage && (
          <div className="absolute border-[1px] border-black rounded-xl overflow-hidden inset-0 flex items-center justify-center">
            <img
              src={designImage}
              alt="Custom design"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className={cn(
              "text-center px-4 py-2 rounded",
              theme === "minimal"
                ? "text-gray-900"
                : theme === "vibrant"
                ? "text-purple-900"
                : "text-gray-100"
            )}
          >
            {texts.map((text, index) =>
              text ? (
                <p
                  key={index}
                  className={cn(
                    "font-bold transition-all",
                    index === 0 ? "text-2xl mb-0" : "text-xl mb-0",
                    theme === "dark" && "text-shadow-sm"
                  )}
                >
                  {text}
                </p>
              ) : null
            )}
          </div>
        </div>
      </div>

      {/* Size info */}
      <div
        className={cn(
          "mt-4 text-center p-2 rounded-lg",
          theme === "minimal"
            ? "bg-gray-100"
            : theme === "vibrant"
            ? "bg-purple-100"
            : "bg-gray-800"
        )}
      >
        <p className="text-sm font-medium">
          <span>Height: {physicalAttributes.height}cm</span>
          <span className="mx-2">•</span>
          <span>Weight: {physicalAttributes.weight}kg</span>
          <span className="mx-2">•</span>
          <span>
            Build:{" "}
            {physicalAttributes.build.charAt(0).toUpperCase() +
              physicalAttributes.build.slice(1)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TShirtPreview;
