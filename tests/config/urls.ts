import { baseConfig } from './base';
import { paths, routes } from './paths';

export const config = {
  get REACT_URL() {
    return `${baseConfig.BASE_URL}${paths.REACT_APP}`;
  },
  get REACT_ALL_ITEMS_ROUTE() {
    return `${baseConfig.BASE_URL}${paths.REACT_APP}${routes.ALL_ITEMS}`;
  },
  get REACT_COMPLETED_ITEMS_ROUTE() {
    return `${baseConfig.BASE_URL}${paths.REACT_APP}${routes.COMPLETED_ITEMS}`;
  },
};
