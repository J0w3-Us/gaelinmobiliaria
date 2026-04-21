import React from 'react';

export interface PlayButtonProps {
  onClick: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-20 
                 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 
                 rounded-full border border-[#F5E6C8]/60 bg-black/20 backdrop-blur-sm
                 transition-all duration-300 hover:scale-110 hover:border-[#F5E6C8] hover:bg-black/40 group"
      aria-label="Reproducir video"
    >
      <svg
        className="w-8 h-8 md:w-10 md:h-10 text-[#F5E6C8] translate-x-1 transition-transform duration-300"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
};
