import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-semibold text-navy">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
            error 
              ? 'border-red-500 focus:ring-red-200' 
              : 'border-steel-dark focus:border-navy focus:ring-navy/20'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
