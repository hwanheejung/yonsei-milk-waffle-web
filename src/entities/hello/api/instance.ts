import { kyInstance } from '@/shared/api/instance';
import { HelloApi } from './index';

const helloApi = new HelloApi(kyInstance);

export { helloApi };
