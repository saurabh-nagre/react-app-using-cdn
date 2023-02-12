import {setup} from 'axios-cache-adapter';

const api = setup({
  cache: {
    maxAge: 15 * 60 * 1000,
  },
});
export const GetDataHelper = (url: string) => {
  console.debug(url);
  return api.get(url);
};
