import {Action, Details} from '../interfaces/interfaces';

import * as constants from '../constants/constants';

const favourites = new Map<string, Details>();

const FavouriteReducer = (
  state: Map<string, Details> = favourites,
  action: Action,
) => {
  const newMap = new Map<string, Details>(state);
  switch (action.type) {
    case constants.INSERT_FAVOURITE_PROFILE:
      newMap.set(action.payload.login, action.payload);
      return newMap;
    case constants.REMOVE_FAVOURITE_PROFILE:
      if (newMap.has(action.payload)) {
        newMap.delete(action.payload);
      }
      return newMap;
    default:
      return state;
  }
};

export default FavouriteReducer;
