'use client';

import { useState, type RefObject } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VideoMuteToggleProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  className?: string;
}

export default function VideoMuteToggle({ videoRef, className = "" }: VideoMuteToggleProps) {
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? 'Unmute video' : 'Mute video'}
      className={`z-20 bg-black/50 hover:bg-black/70 text-white p-2 backdrop-blur-sm border border-white/20 transition-colors ${className}`}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}
