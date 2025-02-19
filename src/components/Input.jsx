/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", error, icon, helperText, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`
            w-full
            px-4 py-2.5
            ${icon ? "pl-10" : "pl-4"}
            text-gray-900
            bg-white
            border border-gray-300
            rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed
            placeholder:text-gray-400
            transition-colors duration-200
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }
            ${className}
          `.trim()}
          ref={ref}
          {...props}
          id={id}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
