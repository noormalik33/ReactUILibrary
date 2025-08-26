import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../ThemeContext';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  header, 
  footer, 
  size = 'medium',
  videoBg,
  className = ''
}) => {
  const { theme } = useContext(ThemeContext);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27 && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-xs sm:max-w-sm w-full mx-2 sm:mx-4',
    medium: 'max-w-sm sm:max-w-md md:max-w-lg w-full mx-2 sm:mx-4',
    large: 'max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl w-full mx-2 sm:mx-4'
  };

  const themeClasses = {
    light: 'bg-white text-gray-800 border-gray-200',
    dark: 'bg-gray-800 text-white border-gray-700',
    mixed: 'bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800 border-purple-200'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 animate-fade-in backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      
      {/* Modal Container */}
      <div className={`relative ${sizeClasses[size]} max-h-[85vh] sm:max-h-[90vh] rounded-xl overflow-hidden shadow-2xl animate-slide-up border ${themeClasses[theme]} ${className}`}>
        {/* Background Video */}
        {videoBg && (
          <video 
            className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" 
            autoPlay 
            muted 
            loop
            playsInline
          >
            <source src={videoBg} type="video/mp4" />
          </video>
        )}
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 p-1 sm:p-2 rounded-full bg-black bg-opacity-20 text-white hover:bg-opacity-40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Close modal"
        >
          <FaTimes className="w-3 sm:w-4 h-3 sm:h-4" />
        </button>

        {/* Modal Content */}
        <div className="relative z-10 flex flex-col max-h-[85vh] sm:max-h-[90vh]">
          {/* Header */}
          {header && (
            <div className="px-2 sm:px-4 py-2 sm:py-4 border-b border-gray-200 dark:border-gray-600 flex-shrink-0 bg-opacity-90 backdrop-blur-sm">
              {header}
            </div>
          )}
          
          {/* Body */}
          <div className="px-2 sm:px-4 py-2 sm:py-4 overflow-y-auto flex-grow custom-scrollbar">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="px-2 sm:px-4 py-2 sm:py-4 border-t border-gray-200 dark:border-gray-600 flex-shrink-0 bg-opacity-90 backdrop-blur-sm">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  videoBg: PropTypes.string,
  className: PropTypes.string,
};

export default Modal;