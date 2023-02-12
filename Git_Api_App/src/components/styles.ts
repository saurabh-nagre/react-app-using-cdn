import {StyleSheet} from 'react-native';

import * as constants from '../constants/constants';

export const styles = StyleSheet.create({
  image: {
    height: constants.IMAGE_HEIGHT_LONG,
    width: constants.IMAGE_WIDTH_LONG,
    borderRadius: constants.IMAGE_BORDER_RADIUS,
  },
  card: {
    backgroundColor: constants.WHITE,
    elevation: 10,
    marginBottom: '1%',
    padding: '2%',
    flex: 1,
  },
  front: {
    width: '30%',
    paddingRight: '2%',
  },
  horizontalFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalFlex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: constants.BLACK,
    fontSize: 12,
    justifyContent: 'center',
    margin: '1%',
  },
  textBold: {
    fontSize: 17,
    fontWeight: '700',
    marginVertical: '2%',
    color: constants.BLACK,
    textAlign: 'center',
  },
  bigText: {
    fontSize: 22,
    color: constants.BLACK,
  },
  circle: {
    backgroundColor: constants.LIGHTGREY,
    borderRadius: constants.IMAGE_BORDER_RADIUS,
    padding: 1,
  },
  link: {
    fontSize: 16,
    color: constants.BLUE,
    padding: '2%',
    fontStyle: 'italic',
  },
  linkButton: {
    color: constants.WHITE,
    fontSize: 15,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: constants.WHITE,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    width: '20%',
    margin: '2%',
  },
  textInput: {
    fontSize: 18,
    width: '100%',
    color: constants.BLACK,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: constants.BLACK,
  },
});
