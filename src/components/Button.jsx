/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  size = "md",
  variant = "filled",
  className = "",
  icon,
  loading = false,
  disabled = false,
  ...props
}) {
  // Size classes mapping
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-2.5 text-lg",
  };

  // Variant classes mapping
  const variantClasses = {
    filled: `${bgColor} ${textColor} hover:bg-opacity-90`,
    outlined: `border-2 border-current bg-transparent ${bgColor.replace(
      "bg-",
      "text-"
    )} hover:bg-opacity-10`,
    ghost: `bg-transparent ${bgColor.replace(
      "bg-",
      "text-"
    )} hover:bg-opacity-10`,
  };

  // Base classes for all buttons
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-lg
    font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-${
      bgColor.split("-")[1]
    }-500
    disabled:opacity-60 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={baseClasses}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
