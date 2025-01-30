/* eslint-disable react/prop-types */


function Button({children, 
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) { 

  return (
    <button className={`px-4 p-2 rounded-lg ${className} ${type} ${bgColor} ${textColor}`} {...props}>
      {children}
    </button>
  )
}

export default Button