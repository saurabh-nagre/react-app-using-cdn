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

import {Arguments, Details} from '../interfaces/interfaces';

import * as helpers from '../helpers/helpers';
import * as actions from '../actions/flateListActions';
import * as constants from '../constants/constants';

import {styles} from './styles';

const loadingImage = require('../assets/loading.gif');

const initialArgs: Arguments = {
  userList: [],
  isLoading: false,
  searchInput: '',
  url: constants.USER_LIST_API_ENDPOINT,
  isRefreshing: true,
  page: 1,
  isFocused: false,
};

const reducer = (
  state: Arguments,
  action: {type: string; payload: Object},
): Arguments => {
  switch (action.type) {
    case constants.UPDATE_USER_LIST:
      return {...state, userList: action.payload};
    case constants.INCREASE_PAGE_NO:
      return {...state, page: action.payload};
    case constants.EXTEND_USER_LIST:
      return {...state, userList: [...state.userList, ...action.payload]};
    case constants.UPDATE_ISLOADING:
      return {...state, isLoading: action.payload};
    case constants.UPDATE_SEARCH_INPUT:
      return {...state, searchInput: action.payload};
    case constants.UPDATE_URL:
      return {...state, url: action.payload};
    case constants.UPDATE_IS_REFRESHING:
      return {...state, isRefreshing: action.payload};
    case constants.UPDATE_IS_FOCUSED:
      return {...state, isFocused: action.payload};
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
      state.searchInput === ''
        ? dispatch(actions.urlUpdate(props.apiURL))
        : dispatch(
            actions.urlUpdate(
              constants.USER_SEARCH_LIST_API_ENDPOINT +
                '?q=' +
                state.searchInput,
            ),
          );
      dispatch(actions.pageNoUpdate(1));
    }, [state.searchInput, props.apiURL]);

    useEffect(() => {
      const methodCall = async () => {
        dispatch(actions.isLoadingUpdate(true));
        await helpers
          .GetDataHelper(state.url)
          .then(value => {
            state.searchInput === ''
              ? dispatch(actions.userListUpdate(value.data))
              : dispatch(actions.userListUpdate(value.data.items));
            dispatch(actions.pageNoUpdate(state.page + 1));
            dispatch(actions.isLoadingUpdate(false));
          })
          .catch(reason => {
            dispatch(actions.isLoadingUpdate(false));
            console.log(reason);
          });
      };
      methodCall();
    }, [state.isRefreshing]);

    const fetchMoreData = async () => {
      if (state.searchInput !== '') {
        if (props.searchOnlyList) {
          await helpers
            .GetDataHelper(state.url + '&&page=' + state.page)
            .then(value => {
              let searchList: Details[] = [];
              searchList = value.data.item.reduce(
                (list: Details[], ele: Details) => {
                  if (
                    ele.login.includes(state.searchInput) ||
                    ele.name.includes(state.searchInput)
                  ) {
                    list.push(ele);
                  }
                  return list;
                },
                searchList,
              );
              dispatch(actions.userListExtend(searchList));
            })
            .catch(reason => {
              console.log(reason);
            });
        } else {
          await helpers
            .GetDataHelper(state.url + '&&page=' + state.page)
            .then(value => {
              dispatch(actions.userListExtend(value.data.items));
            })
            .catch(reason => {
              console.log(reason);
            });
        }
        dispatch(actions.pageNoUpdate(state.page + 1));
      }
    };

    const handleSearch = async () => {
      dispatch(actions.isLoadingUpdate(true));
      Keyboard.dismiss();
      if (props.searchOnlyList) {
        let searchList: Details[] = [];
        searchList = state.userList.reduce((list, value) => {
          if (
            value.login.includes(state.searchInput) ||
            value.name.includes(state.searchInput)
          ) {
            list.push(value);
          }
          return list;
        }, searchList);

        dispatch(actions.userListUpdate(searchList));
      } else {
        await helpers
          .GetDataHelper(state.url)
          .then(value => {
            dispatch(actions.userListUpdate(value.data.items));
            dispatch(actions.pageNoUpdate(state.page + 1));
          })
          .catch(reason => {
            console.log(reason);
          });
      }
      dispatch(actions.isFocusedUpdate(false));
      dispatch(actions.isLoadingUpdate(false));
    };
    return (
      <View style={[listStyles.body]}>
        <View style={[listStyles.back, styles.horizontalFlex]}>
          <TouchableOpacity
            style={[listStyles.searchBackground, styles.horizontalFlex]}
            onPress={() => dispatch(actions.isFocusedUpdate(true))}>
            <Icon name="search" size={18} />
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                dispatch(actions.searchInputUpdate(text));
              }}
              focusable={state.isFocused}
              value={state.searchInput}
              placeholder={constants.PLACEHOLDER_CONSTANT}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
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
            onEndReached={fetchMoreData}
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
    height: '30%',
    width: '30%',
    alignSelf: 'center',
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
});
export default WithComponentList;
