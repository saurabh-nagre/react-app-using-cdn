import React from 'react';
import {Provider} from 'react-redux';

import {legacy_createStore} from 'redux';
import rootReducer from './src/reducers/rootReducer';

import StackNavigator from './src/routes/stackNavigator';

const App = () => {
  const store = legacy_createStore(rootReducer);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
