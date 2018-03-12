import React from 'react';
import { UIManager, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { AppLoading } from 'expo';

import { store, client } from './src/store';
import { colors } from './src/utils/constants';
import { login } from './src/actions/user';

import AppNavigation from './src/navigations';

if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {

    state = {
        isAppReady: false
    }

    componentWillMount() {
        this._isToken();
    }

    _isToken = async () => {
        try {
            const token = await AsyncStorage.getItem('attwittercloneapplication');

            if (token != null) {
                store.dispatch(login());
            }
        } catch (error) {
            throw error;
        }

        this.setState({ isAppReady: true });
    }

    render() {
        if (!this.state.isAppReady) {
            return <AppLoading />
        }

        return (
            <ApolloProvider store={store} client={client}>
                <ThemeProvider theme={colors}>
                    <AppNavigation />
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}
