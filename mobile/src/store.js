/* eslint-disable no-param-reassign */
import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import reducers from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'https://shrouded-shore-67396.herokuapp.com/graphql',
});

const wsClient = new SubscriptionClient('ws://shrouded-shore-67396.herokuapp.com/subscriptions', {
  reconnect: true,
  connectionParams: {}
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

const networkInterfaceWithSubs = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubs
});

const middlewares = [client.middleware(), thunk, createLogger()];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
