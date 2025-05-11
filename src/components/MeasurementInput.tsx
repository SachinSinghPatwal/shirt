import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { inputStyles } from '../utils/theme-utils';
import { cn } from '../utils/cn';
import { useFormContext } from 'react-hook-form';

interface MeasurementInputProps {
  defaultHeight?: number;
  defaultWeight?: number;
  defaultBuild?: string;
}

const MeasurementInput: React.FC<MeasurementInputProps> = ({
  defaultHeight = 180,
  defaultWeight = 80,
  defaultBuild = 'athletic'
}) => {
  const { theme } = useTheme();
  const { register, formState: { errors } } = useFormContext();

  const buildOptions = [
    { value: 'lean', label: 'Lean' },
    { value: 'regular', label: 'Regular' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'big', label: 'Big' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="height" className="block text-sm font-medium mb-1">
          Height (cm)
        </label>
        <input
          id="height"
          type="number"
          className={cn(inputStyles({ theme }), errors.height && 'border-red-500')}
          defaultValue={defaultHeight}
          min={100}
          max={250}
          {...register('height', { 
            required: 'Height is required',
            min: { value: 100, message: 'Height must be at least 100cm' },
            max: { value: 250, message: 'Height must be at most 250cm' }
          })}
        />
        {errors.height && (
          <p className="text-xs text-red-500 mt-1">{errors.height.message?.toString()}</p>
        )}
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium mb-1">
          Weight (kg)
        </label>
        <input
          id="weight"
          type="number"
          className={cn(inputStyles({ theme }), errors.weight && 'border-red-500')}
          defaultValue={defaultWeight}
          min={30}
          max={200}
          {...register('weight', { 
            required: 'Weight is required',
            min: { value: 30, message: 'Weight must be at least 30kg' },
            max: { value: 200, message: 'Weight must be at most 200kg' }
          })}
        />
        {errors.weight && (
          <p className="text-xs text-red-500 mt-1">{errors.weight.message?.toString()}</p>
        )}
      </div>

      <div>
        <label htmlFor="build" className="block text-sm font-medium mb-1">
          Build
        </label>
        <select
          id="build"
          className={cn(inputStyles({ theme }), errors.build && 'border-red-500')}
          defaultValue={defaultBuild}
          {...register('build', { required: 'Build is required' })}
        >
          {buildOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.build && (
          <p className="text-xs text-red-500 mt-1">{errors.build.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default MeasurementInput;