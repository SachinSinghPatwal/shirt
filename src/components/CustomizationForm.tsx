import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useTheme } from "../contexts/ThemeContext";
import { cardStyles, buttonStyles } from "../utils/theme-utils";
import { cn } from "../utils/cn";
import MeasurementInput from "./MeasurementInput";
import ImageUpload from "./ImageUpload";
import TextInput from "./TextInput";
import TShirtPreview from "./TShirtPreview";
import { Save } from "lucide-react";

type FormValues = {
  height: number;
  weight: number;
  build: string;
  text1: string;
  text2: string;
  text3: string;
};

const defaultValues: FormValues = {
  height: 180,
  weight: 80,
  build: "athletic",
  text1: "",
  text2: "",
  text3: "",
};

// Default shirt design image
const defaultDesignImage = "";

const CustomizationForm: React.FC = () => {
  const { theme } = useTheme();
  const [designImage, setDesignImage] = useState<string | null>(
    defaultDesignImage
  );
  const methods = useForm<FormValues>({ defaultValues });
  const { handleSubmit, watch } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data, "Design Image:", designImage);
    // In a real app, this would send the data to a backend service
    alert("Custom T-shirt design saved! Check console for details.");
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesignImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setDesignImage(defaultDesignImage);
    }
  };

  // Watch form values for preview
  const height = watch("height");
  const weight = watch("weight");
  const build = watch("build");
  const text1 = watch("text1");
  const text2 = watch("text2");
  const text3 = watch("text3");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - T-shirt Preview */}
          <div className="w-full lg:w-5/12">
            <div className={cn(cardStyles({ theme }), "h-full")}>
              <h2 className="text-xl font-bold mb-6">T-shirt Preview</h2>
              <TShirtPreview
                designImage={designImage}
                texts={[text1, text2, text3]}
                physicalAttributes={{ height, weight, build }}
              />
            </div>
          </div>

          {/* Right Column - Customization Options */}
          <div className="w-full lg:w-7/12">
            <div className={cn(cardStyles({ theme }), "h-full")}>
              <h2 className="text-xl font-bold mb-6">Customize Your T-shirt</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side of customization form */}
                <div className="space-y-8">
                  <MeasurementInput
                    defaultHeight={defaultValues.height}
                    defaultWeight={defaultValues.weight}
                    defaultBuild={defaultValues.build}
                  />

                  <TextInput />
                </div>

                {/* Right side of customization form */}
                <div>
                  <ImageUpload
                    onImageChange={handleImageChange}
                    defaultImage={defaultDesignImage}
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-8 text-right">
                <button
                  type="submit"
                  className={cn(
                    buttonStyles({ theme }),
                    "flex items-center gap-2 ml-auto"
                  )}
                >
                  <Save size={18} />
                  <span>Save Design</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomizationForm;
