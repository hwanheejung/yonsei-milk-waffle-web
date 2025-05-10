import type { RefObject } from 'react';

const AudioPlayer = ({ audioRef, onEnded }: TProps) => {
  return <audio ref={audioRef} src="/audio/to_you.mp3" onEnded={onEnded} className="hidden" />;
};

export { AudioPlayer };

type TProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
  onEnded: () => void;
};
