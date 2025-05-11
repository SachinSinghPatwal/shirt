import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTheme } from '../contexts/ThemeContext';
import { inputStyles } from '../utils/theme-utils';
import { cn } from '../utils/cn';

const TextInput: React.FC = () => {
  const { theme } = useTheme();
  const { register, formState: { errors }, watch } = useFormContext();
  
  // Watch all three text inputs to show character counts
  const text1 = watch('text1', '');
  const text2 = watch('text2', '');
  const text3 = watch('text3', '');
  
  const maxLength = 30;

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Custom Text (Up to 3 lines)</h3>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="text1" className="block text-sm font-medium">
            Line 1
          </label>
          <span className={cn(
            "text-xs",
            text1.length > maxLength ? "text-red-500" : 
            theme === 'minimal' ? 'text-gray-500' : 
            theme === 'vibrant' ? 'text-purple-500' : 'text-gray-400'
          )}>
            {text1.length}/{maxLength}
          </span>
        </div>
        <input
          id="text1"
          type="text"
          className={cn(
            inputStyles({ theme }), 
            errors.text1 && 'border-red-500',
            'transition-all duration-200'
          )}
          placeholder="Enter text for line 1"
          {...register('text1', { 
            maxLength: { 
              value: maxLength, 
              message: `Maximum ${maxLength} characters allowed` 
            } 
          })}
        />
        {errors.text1 && (
          <p className="text-xs text-red-500 mt-1">{errors.text1.message?.toString()}</p>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="text2" className="block text-sm font-medium">
            Line 2
          </label>
          <span className={cn(
            "text-xs",
            text2.length > maxLength ? "text-red-500" : 
            theme === 'minimal' ? 'text-gray-500' : 
            theme === 'vibrant' ? 'text-purple-500' : 'text-gray-400'
          )}>
            {text2.length}/{maxLength}
          </span>
        </div>
        <input
          id="text2"
          type="text"
          className={cn(
            inputStyles({ theme }), 
            errors.text2 && 'border-red-500'
          )}
          placeholder="Enter text for line 2"
          {...register('text2', { 
            maxLength: { 
              value: maxLength, 
              message: `Maximum ${maxLength} characters allowed` 
            } 
          })}
        />
        {errors.text2 && (
          <p className="text-xs text-red-500 mt-1">{errors.text2.message?.toString()}</p>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="text3" className="block text-sm font-medium">
            Line 3
          </label>
          <span className={cn(
            "text-xs",
            text3.length > maxLength ? "text-red-500" : 
            theme === 'minimal' ? 'text-gray-500' : 
            theme === 'vibrant' ? 'text-purple-500' : 'text-gray-400'
          )}>
            {text3.length}/{maxLength}
          </span>
        </div>
        <input
          id="text3"
          type="text"
          className={cn(
            inputStyles({ theme }), 
            errors.text3 && 'border-red-500'
          )}
          placeholder="Enter text for line 3"
          {...register('text3', { 
            maxLength: { 
              value: maxLength, 
              message: `Maximum ${maxLength} characters allowed` 
            } 
          })}
        />
        {errors.text3 && (
          <p className="text-xs text-red-500 mt-1">{errors.text3.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default TextInput;