import type { Timestamp } from '@/entities/time/Timestamp';
import type { Team } from '@/entities/team/Team';

export type HelloReqeustDto = {
  message: string;
};

export type HelloResponseDto = {
  message: string;
};

export type CreateGameResultRequestDto = {
  timestamp: Timestamp[];
  team: Team;
};

export type CreateGameResultResponseDto = {
  game_start_at: number;
  song_length: number;
};

export type ReadGameStatusResponseDto = {
  game_start_at: number;
  song_length: number;
};
