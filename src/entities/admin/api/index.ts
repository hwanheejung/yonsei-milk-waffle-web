import type {
  AdminGameResponseDto,
  AdminGameStartRequestDto,
  AdminGameStartResponseDto,
} from '@/shared/api/dto';
import type { KyInstance, Options } from 'ky';

export class AdminApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  async getGame(kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<AdminGameResponseDto>('admin/game', {
        ...options,
      })
      .json();

    return response;
  }

  async startGame(data: AdminGameStartRequestDto, kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .post<AdminGameStartResponseDto>('admin/game/start', {
        json: data,
        ...options,
      })
      .json();

    return response;
  }
}
