import type { RefObject } from 'react';

interface AudioPlayerProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  onEnded: () => void;
}

export function AudioPlayer({ audioRef, onEnded }: AudioPlayerProps) {
  return (
    <audio ref={audioRef} src="/audio/to_you.mp3" onEnded={onEnded} className="hidden">
      <track kind="captions" src="" label="English" />
    </audio>
  );
}
