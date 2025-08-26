import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../ThemeContext';
import { FaSpinner } from 'react-icons/fa';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  loading, 
  disabled, 
  tooltip, 
  onClick,
  className = '',
  fullWidth = false,
  href
}) => {
  const { theme } = useContext(ThemeContext);

  const handleClick = (e) => {
    if (href && !disabled && !loading) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (onClick && !disabled && !loading) {
      onClick(e);
    }
  };

  const baseClasses = "inline-flex items-center justify-center font-semibold border-none rounded-lg cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 hover:shadow-lg transform hover:-translate-y-0.5",
    secondary: "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 focus:ring-gray-500 hover:shadow-lg transform hover:-translate-y-0.5",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 hover:shadow-lg transform hover:-translate-y-0.5",
    info: "bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 focus:ring-blue-400 hover:shadow-lg transform hover:-translate-y-0.5",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500 hover:shadow-lg transform hover:-translate-y-0.5",
    outline: "border-2 border-current bg-transparent hover:bg-current hover:text-white focus:ring-current transition-all duration-300"
  };

  const sizeClasses = {
    small: "px-3 py-2 text-sm min-h-[36px]",
    medium: "px-4 py-2 text-base min-h-[44px]",
    large: "px-6 py-3 text-lg min-h-[52px]"
  };

  const themeClasses = {
    light: variant === 'outline' ? 'text-gray-700 border-gray-700 hover:bg-gray-700' : '',
    dark: variant === 'outline' ? 'text-gray-200 border-gray-200 hover:bg-gray-200 hover:text-gray-800' : '',
    mixed: variant === 'outline' ? 'text-purple-600 border-purple-600 hover:bg-purple-600' : ''
  };

  return (
    <div className="relative inline-block group">
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${themeClasses[theme]} ${fullWidth ? 'w-full' : ''} ${className} ${loading ? 'opacity-80 pointer-events-none' : ''}`}
        onClick={handleClick}
        disabled={disabled || loading}
      >
        {loading && (
          <FaSpinner className="animate-spin mr-2 flex-shrink-0" />
        )}
        {icon && !loading && (
          <span className="mr-2 flex-shrink-0">{icon}</span>
        )}
        <span className="truncate">{children}</span>
      </button>
      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'info', 'success', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
};

export default Button;