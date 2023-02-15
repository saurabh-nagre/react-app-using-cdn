import * as constants from '../constants/constants';
import {Details} from '../interfaces/interfaces';

export const InsertFavoriteUser = (data: Details) => ({
  type: constants.INSERT_FAVOURITE_PROFILE,
  payload: data,
});

export const RemoveFavouriteUser = (data: string) => ({
  type: constants.REMOVE_FAVOURITE_PROFILE,
  payload: data,
});
