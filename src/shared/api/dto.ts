export type HelloReqeustDto = {
  message: string;
};

export type HelloResponseDto = {
  message: string;
};

export type AdminGameResponseDto = {
  song_length: number;
  beat_list: number[];
};

export type AdminGameStartRequestDto = {
  game_start_at: number;
};

export type AdminGameStartResponseDto = {
  status: 'OK';
};
