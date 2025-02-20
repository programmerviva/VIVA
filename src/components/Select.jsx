/* eslint-disable react/prop-types */
import React, { useId } from "react";

function Select(
  { options, label, className = "", value, onChange, error, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          id={id}
          ref={ref}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`
            block w-full px-4 py-3
            text-base text-gray-900 dark:text-white
            bg-white dark:bg-gray-800
            border border-gray-300 dark:border-gray-600
            rounded-lg shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            dark:focus:ring-blue-400 dark:focus:border-blue-400
            appearance-none
            transition-all duration-200 ease-in-out
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            hover:border-blue-400 dark:hover:border-blue-300
            sm:text-sm md:text-base
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }
            ${className}
          `}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 transition-colors duration-200 group-hover:text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default React.forwardRef(Select);
