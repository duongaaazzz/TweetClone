/* eslint-disable no-param-reassign */
import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
});

export const client = new ApolloClient({
  networkInterface,
});

networkInterface.use([{
  async applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    try {
      const token = await AsyncStorage.getItem('attwittercloneapplication');

      if (token != null) {
        req.options.headers.authorization = `lqduong ${token}` || null;
      }
    } catch (error) {
      throw error;
    }
    return next();
  }

}]);

const middlewares = [client.middleware(), thunk, createLogger()];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
