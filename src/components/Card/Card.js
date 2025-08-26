import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../ThemeContext';

const Card = ({ 
  title, 
  content, 
  imageUrl, 
  videoUrl, 
  actions,
  onClick,
  variant = 'default',
  className = '',
  linkUrl
}) => {
  const { theme } = useContext(ThemeContext);

  const themeClasses = {
    light: 'bg-gradient-to-br from-white to-gray-100 text-gray-800 border-gray-200',
    dark: 'bg-gradient-to-br from-gray-800 to-gray-900 text-white border-gray-700',
    mixed: 'bg-gradient-to-br from-purple-50 to-blue-50 text-gray-800 border-purple-200'
  };

  const handleCardClick = () => {
    if (linkUrl) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border ${themeClasses[theme]} ${className}`}
      onClick={handleCardClick}
      role="article"
      aria-label={title}
    >
      {/* Media Section */}
      {(imageUrl || videoUrl) && (
        <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
          {imageUrl && (
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          )}
          {videoUrl && (
            <video 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
              autoPlay 
              muted 
              loop
              playsInline
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      {/* Content Section */}
      <div className="p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2 leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {content}
        </p>
      </div>
      
      {/* Actions Section */}
      {actions && (
        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {actions}
          </div>
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
  actions: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'horizontal']),
  className: PropTypes.string,
  linkUrl: PropTypes.string,
};

export default Card;