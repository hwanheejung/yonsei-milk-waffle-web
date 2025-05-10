// import { useGetGameQuery } from "@/entities/admin";
// import { useStartGameMutation } from "@/entities/admin/api/mutations";
import { useEffect, useRef, useState } from 'react';
import { AudioPlayer } from './audio-player';
import { BeatTrack } from './beat-track';
import { CheerleadingStick } from './cheerleading-stick';
import { GameControls } from './game-controls';

type TBeatData = {
  song_length: number;
  beat_list: number[];
};

// Dummy data
const dummyBeatData: TBeatData = {
  song_length: 47,
  beat_list: [
    2.653, 4.606, 6.465, 6.832, 7.274, 7.733, 8.311, 9.269, 10.255, 11.55, 12.007, 13.957, 14.851,
    15.81, 16.789, 17.684, 19.638, 20.506, 21.441, 22.789, 23.25, 23.833, 24.705, 25.591, 26.542,
    27.097, 28.919, 30.801, 31.751, 32.661, 34.93, 35.669, 36.423, 37.207, 37.908, 38.661, 38.367,
    40.127, 40.878, 41.636, 42.401, 43.157, 43.902, 44.662, 45.297, 45.423, 45.595, 45.775,
  ],
};

const AdminGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [beatData] = useState<TBeatData>(dummyBeatData);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);

  // TODO: Uncomment when backend is ready
  //   const { data: gameData } = useGetGameQuery();
  // const { mutateAsync: startGame } = useStartGameMutation();

  //   console.log(">>>", gameData);

  const handleStartGame = () => {
    if (!audioRef.current) return;

    // TODO: Uncomment when backend is ready
    // startGame({ game_start_at: Date.now() });

    startTimeRef.current = Date.now();
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (audioRef.current) {
        const currentTime = (Date.now() - startTimeRef.current) / 1000;
        setCurrentTime(currentTime);

        if (currentTime >= beatData.song_length) {
          audioRef.current.pause();
          setIsPlaying(false);
          setCurrentTime(0);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, beatData.song_length]);

  return (
    <div className="space-y-4">
      <GameControls
        isPlaying={isPlaying}
        onStart={handleStartGame}
        remainingTime={beatData.song_length - currentTime}
      />

      <BeatTrack currentTime={currentTime} beatList={beatData.beat_list} isPlaying={isPlaying} />

      <CheerleadingStick
        currentTime={currentTime}
        beatList={beatData.beat_list}
        isPlaying={isPlaying}
      />

      <AudioPlayer audioRef={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export { AdminGame };
