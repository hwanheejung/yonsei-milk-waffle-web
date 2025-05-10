import { create } from 'zustand';

interface GameState {
  isPlaying: boolean;
  currentTime: number;
  gameStarted: boolean;
  setIsPlaying: (v: boolean) => void;
  setCurrentTime: (t: number) => void;
  startGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  gameStarted: false,
  setIsPlaying: (v) => set({ isPlaying: v }),
  setCurrentTime: (t) => set({ currentTime: t }),
  startGame: () => set({ gameStarted: true, isPlaying: true, currentTime: 0 }),
  resetGame: () => set({ gameStarted: false, isPlaying: false, currentTime: 0 }),
}));
