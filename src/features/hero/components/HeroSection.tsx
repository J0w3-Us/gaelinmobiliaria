import React, { useState } from 'react';
import { HeroContent } from './HeroContent';
import { PlayButton } from './PlayButton';
import { VideoModal } from './VideoModal';

/**
 * HeroSection is the single React island that manages modal state.
 *
 * NOTE: HeroBackground is now an Astro component (HeroBackground.astro).
 * It wraps this island — so this component handles only the interactive
 * layer: content text, play button, and the video modal.
 */
export interface HeroInteractiveProps {
  title: string;
  subtitle: string;
  videoModalWebm: string;
  videoModalMp4: string;
  posterModal?: string;
}

export const HeroSection: React.FC<HeroInteractiveProps> = ({
  title,
  subtitle,
  videoModalWebm,
  videoModalMp4,
  posterModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Centered play button — absolute positioned inside HeroBackground
      <PlayButton onClick={openModal} /> */}

      {/* Bottom-left content — absolute positioned inside HeroBackground */}
      <HeroContent title={title} subtitle={subtitle} onPlayVideo={openModal} />

      {/* Modal portal — renders into body via fixed positioning */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoWebm={videoModalWebm}
        videoMp4={videoModalMp4}
        posterSrc={posterModal}
      />
    </>
  );
};
