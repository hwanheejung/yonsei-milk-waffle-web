import type { HelloResponseDto } from '@/shared/api/dto';
import type { KyInstance, Options } from 'ky';

export class HelloApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  async getHello(kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<HelloResponseDto>('hello', {
        ...options,
      })
      .json();

    return response;
  }
}
