import axios from 'axios';

export const GetDataHelper = (url: string) => {
  // console.debug(url);
  return axios.get(url, {
    headers: {Authorization: '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'},
  });
};
