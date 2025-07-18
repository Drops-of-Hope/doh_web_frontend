import React from 'react';
import { Search } from 'lucide-react';

// Button component
interface ButtonProps {
  title: string;
  containerStyles: string;
  handleClick: () => void;
  leftIcon?: React.ReactNode;
  iconSpacing?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  containerStyles, 
  handleClick, 
  leftIcon, 
  iconSpacing = 'gap-2', 
  disabled = false 
}) => (
  <button
    onClick={handleClick}
    disabled={disabled}
    className={`px-4 py-2 ${iconSpacing} flex items-center justify-center ${containerStyles}`}
  >
    {leftIcon}
    {title}
  </button>
);

// Types
type RequestStatus = 'pending' | 'accepted' | 'rejected';

interface ActionButtonsProps {
  requestStatus: RequestStatus;
  onCheckAvailability: () => void;
  onAccept: () => void;
  onReject: () => void;
  hasCheckedAvailability: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  requestStatus,
  onCheckAvailability,
  onAccept,
  onReject,
  hasCheckedAvailability
}) => {
  return (
    <>
      {/* Check Availability Button - Fixed Bottom Right - Only show if request is pending */}
      {requestStatus === 'pending' && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            title="Check Availability"
            containerStyles="bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-lg font-medium transition-all transform hover:scale-105"
            handleClick={onCheckAvailability}
            leftIcon={<Search className="w-5 h-5" />}
            iconSpacing="gap-2"
          />
        </div>
      )}
    </>
  );
};