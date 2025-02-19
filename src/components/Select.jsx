/* eslint-disable react/prop-types */
import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          id={id}
          ref={ref}
          className={`
            block w-full px-4 py-2.5
            text-base text-gray-900 dark:text-white
            bg-white dark:bg-gray-800
            border border-gray-300 dark:border-gray-600
            rounded-lg
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            dark:focus:ring-primary-500 dark:focus:border-primary-500
            appearance-none
            transition-colors duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            sm:text-sm
            ${className}`}
        >
          {options?.map((option) => (
            <option
              key={option}
              value={option}
              className="py-2 text-gray-900 dark:text-white"
            >
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
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
    </div>
  );
}

export default React.forwardRef(Select);
