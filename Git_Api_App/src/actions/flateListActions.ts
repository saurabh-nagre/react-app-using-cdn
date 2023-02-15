import * as constants from '../constants/constants';
import {Details} from '../interfaces/interfaces';

export const userListUpdate = (data: Details[]) => ({
  type: constants.UPDATE_USER_LIST,
  payload: data,
});

export const userListExtend = (data: Details[]) => ({
  type: constants.EXTEND_USER_LIST,
  payload: data,
});

export const pageNoUpdate = (page: number) => ({
  type: constants.INCREASE_PAGE_NO,
  payload: page,
});

export const isLoadingUpdate = (data: boolean) => ({
  type: constants.UPDATE_ISLOADING,
  payload: data,
});
export const searchInputUpdate = (data: string) => ({
  type: constants.UPDATE_SEARCH_INPUT,
  payload: data,
});
export const urlUpdate = (data: string) => ({
  type: constants.UPDATE_URL,
  payload: data,
});

export const isRefreshingUpdate = (data: boolean) => ({
  type: constants.UPDATE_IS_REFRESHING,
  payload: data,
});

export const isFechingUpdate = (data: boolean) => ({
  type: constants.UPDATE_IS_FEACHING,
  payload: data,
});
