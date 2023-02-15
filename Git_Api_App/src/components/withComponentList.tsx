import React, {useEffect, useReducer} from 'react';

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Action, Arguments, Details} from '../interfaces/interfaces';

import * as helpers from '../helpers/helpers';
import * as actions from '../actions/flateListActions';
import * as constants from '../constants/constants';

import {styles} from './styles';

const loadingImage = require('../assets/loading.gif');

const initialArgs: Arguments = {
  userList: [],
  isLoading: false,
  searchInput: '',
  url: '',
  isRefreshing: true,
  page: 2,
  isFetching: true,
};

const reducer = (state: Arguments, action: Action): Arguments => {
  switch (action.type) {
    case constants.UPDATE_USER_LIST:
      return {...state, userList: action.payload};
    case constants.INCREASE_PAGE_NO:
      return {...state, page: action.payload};
    case constants.EXTEND_USER_LIST:
      let list: string[] = [];
      action.payload.forEach(ele => {
        list.push(ele.login);
      });
      let isRepeated = state.userList.some(value => {
        return list.includes(value.login);
      });
      return isRepeated
        ? state
        : {...state, userList: [...state.userList, ...action.payload]};
    case constants.UPDATE_ISLOADING:
      return {...state, isLoading: action.payload};
    case constants.UPDATE_SEARCH_INPUT:
      return {...state, searchInput: action.payload};
    case constants.UPDATE_URL:
      return {...state, url: action.payload};
    case constants.UPDATE_IS_REFRESHING:
      return {...state, isRefreshing: action.payload};
    case constants.UPDATE_IS_FEACHING:
      return {...state, isFetching: action.payload};
    default:
      return initialArgs;
  }
};

const WithComponentList = (Component: JSX.Element) => {
  return function WithList(props: {
    apiURL: string;
    searchOnlyList: boolean;
  }): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialArgs);

    useEffect(() => {
      if (!props.searchOnlyList) {
        state.searchInput === ''
          ? dispatch(actions.urlUpdate(props.apiURL))
          : dispatch(
              actions.urlUpdate(
                constants.USER_SEARCH_LIST_API_ENDPOINT +
                  '?q=' +
                  state.searchInput,
              ),
            );
      }
      dispatch(actions.pageNoUpdate(1));
    }, [state.searchInput, props]);

    useEffect(() => {
      dispatch(actions.isFechingUpdate(false));
      const methodCall = async () => {
        dispatch(actions.isLoadingUpdate(true));
        await helpers
          .GetDataHelper(
            state.url === '' || props.searchOnlyList ? props.apiURL : state.url,
          )
          .then(value => {
            state.searchInput === '' || props.searchOnlyList
              ? dispatch(actions.userListUpdate(value.data))
              : dispatch(actions.userListUpdate(value.data.items));
            dispatch(actions.pageNoUpdate(2));
          })
          .catch(reason => {
            console.log(reason);
          });
        dispatch(actions.isLoadingUpdate(false));
      };
      methodCall();
    }, [state.isRefreshing]);

    const fetchData = async () => {
      if (!state.isFetching) {
        Keyboard.dismiss();
        if (state.page === 1) {
          dispatch(actions.isLoadingUpdate(true));
        } else {
          dispatch(actions.isFechingUpdate(true));
        }
        if (props.searchOnlyList) {
          await helpers
            .GetDataHelper(props.apiURL + '?' + '&&page=' + state.page)
            .then(value => {
              let searchList: Details[] = [];
              if (state.searchInput !== '') {
                searchList = value.data.reduce(
                  (list: Details[], ele: Details) => {
                    if (
                      (ele.login &&
                        ele.login
                          .toLowerCase()
                          .includes(state.searchInput.toLowerCase())) ||
                      (ele.name &&
                        ele.name
                          .toLowerCase()
                          .includes(state.searchInput.toLowerCase()))
                    ) {
                      list.push(ele);
                    }
                    return list;
                  },
                  searchList,
                );
                state.page === 1
                  ? dispatch(actions.userListUpdate(searchList))
                  : dispatch(actions.userListExtend(searchList));
              } else {
                dispatch(actions.userListExtend(value.data));
              }
            })
            .catch(reason => {
              console.log(reason);
            });
        } else if (state.searchInput !== '') {
          await helpers
            .GetDataHelper(state.url + '&&page=' + state.page)
            .then(value => {
              state.page === 1
                ? dispatch(actions.userListUpdate(value.data.items))
                : dispatch(actions.userListExtend(value.data.items));
            })
            .catch(reason => {
              console.log(reason);
            });
        }
        dispatch(actions.pageNoUpdate(state.page + 1));
        dispatch(actions.isLoadingUpdate(false));
        dispatch(actions.isFechingUpdate(false));
      }
    };

    return (
      <View style={[listStyles.body]}>
        <View style={[listStyles.back, styles.horizontalFlex]}>
          <TouchableOpacity
            style={[listStyles.searchBackground, styles.horizontalFlex]}>
            <Icon name="search" size={18} />
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                dispatch(actions.searchInputUpdate(text));
              }}
              value={state.searchInput}
              placeholder={constants.PLACEHOLDER_CONSTANT}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchData} style={styles.searchButton}>
            <Text style={styles.textBold}>Search</Text>
          </TouchableOpacity>
        </View>

        {state.isLoading ? (
          <Image source={loadingImage} style={listStyles.loadingImage} />
        ) : (
          <FlatList
            renderItem={item => <Component details={item.item} />}
            data={state.userList}
            keyExtractor={item => item.login}
            refreshing={state.isLoading}
            onRefresh={() =>
              dispatch(actions.isRefreshingUpdate(!state.isRefreshing))
            }
            extraData={state.userList}
            ListEmptyComponent={
              <Text style={listStyles.textBold}>
                Oops, No users to display!
              </Text>
            }
            ListFooterComponent={
              state.isFetching ? (
                <View style={[styles.horizontalFlex, listStyles.loading]}>
                  <Image
                    source={loadingImage}
                    style={listStyles.bottomFeatchImage}
                    resizeMode="stretch"
                  />
                </View>
              ) : (
                <View />
              )
            }
            onEndReachedThreshold={1}
            onScrollEndDrag={fetchData}
            scrollEventThrottle={1000}
          />
        )}
      </View>
    );
  };
};

const listStyles = StyleSheet.create({
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '2%',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    marginTop: '50%',
  },
  back: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  loadingImage: {
    height: '10%',
    width: '10%',
    alignSelf: 'center',
  },
  bottomFeatchImage: {
    height: 50,
    width: 50,
  },
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: constants.WHITE,
  },
  searchBackground: {
    backgroundColor: constants.LIGHTGREY,
    opacity: 0.5,
    marginStart: '2%',
    paddingHorizontal: '2%',
    borderRadius: 10,
    width: '74%',
  },
  loading: {
    backgroundColor: constants.WHITE,
    justifyContent: 'center',
  },
});
export default WithComponentList;
