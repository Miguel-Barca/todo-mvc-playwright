import { baseConfig } from './base';
import { endpoints } from './endpoints';

export const config = {
  get REACT_URL() {
    return `${baseConfig.BASE_URL}${endpoints.REACT_ENDPOINT}`;
  },
};
