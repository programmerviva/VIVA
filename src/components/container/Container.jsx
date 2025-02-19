/* eslint-disable react/prop-types */
function Container({ children, className = "", fluid = false }) {
  return (
    <div
      className={`
      relative
      ${fluid ? "w-full" : "container"}
      mx-auto
      px-4 sm:px-6 lg:px-8
      py-4 sm:py-6 lg:py-8
      transition-all duration-300 ease-in-out
      ${className}
    `.trim()}
    >
      {children}
    </div>
  );
}

export default Container;
