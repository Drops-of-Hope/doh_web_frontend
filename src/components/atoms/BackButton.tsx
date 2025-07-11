import { FaArrowLeft } from 'react-icons/fa';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  fallbackUrl?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'ghost';
}

export default function BackButton({ 
  onClick, 
  className = '', 
  fallbackUrl = '/',
  disabled = false,
  size = 'md',
  variant = 'default'
}: BackButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {

      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = fallbackUrl;
      }
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-2 text-sm';
      case 'lg':
        return 'px-4 py-4 text-lg';
      default:
        return 'px-3 py-3';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'text-gray-600 hover:text-gray-800 bg-transparent hover:bg-gray-50';
      case 'ghost':
        return 'text-gray-600 hover:text-gray-800 bg-transparent hover:bg-gray-100 border-transparent hover:border-gray-200';
      default:
        return 'text-gray-600 hover:text-gray-800 bg-white hover:border-gray-300 border-gray-200 shadow-sm';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-5 h-5';
      default:
        return 'w-4 h-4';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 
        transition-colors duration-200 
        rounded-full border
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getSizeClasses()}
        ${getVariantClasses()}
        ${className}
      `}
      aria-label="Go back"
    >
      <FaArrowLeft className={getIconSize()} />
    </button>
  );
}