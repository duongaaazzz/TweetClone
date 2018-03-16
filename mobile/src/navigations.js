import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { FontAwesome, SimpleLineIcons, EvilIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ExploredScreen from './screens/ExpoloresScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import CreateTweetScreen from './screens/CreateTweetScreen';

import HeaderAvatar from './components/HeaderAvatar';
import HeaderButton from './components/HeaderButton';

import { colors } from './utils/constants';

const TAB_SIZE_ICON = 20;

const Tabs = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            headerTitle: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome size={TAB_SIZE_ICON} color={tintColor} name="home" />
            )
        })
    },
    Explored: {
        screen: ExploredScreen,
        navigationOptions: () => ({
            headerTitle: 'Explored',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome size={TAB_SIZE_ICON} color={tintColor} name="search" />
            )
        })
    },
    Notifications: {
        screen: NotificationsScreen,
        navigationOptions: () => ({
            headerTitle: 'Notifications',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome size={TAB_SIZE_ICON} color={tintColor} name="bell" />
            )
        })
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: () => ({
            headerTitle: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome size={TAB_SIZE_ICON} color={tintColor} name="user" />
            )
        })
    },
}, {
        lazy: true,
        swipeEnabled: false,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: colors.PRIMARY,
            inactiveTintColor: colors.LIGHT_GRAY,
            style: {
                backgroundColor: colors.WHITE,
                height: 50,
                paddingVertical: 5
            }
        }
    }
);

const CreateTweetModal = StackNavigator(
    {
        CreateTweet: {
            screen: CreateTweetScreen,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <HeaderAvatar />,
                headerRight: (
                    <HeaderButton
                        margin="Right"
                        onPress={() => {
                            navigation.goBack(null);
                            Keyboard.dismiss();
                        }}>
                        <EvilIcons color={colors.PRIMARY} size={25} name="close" />
                    </HeaderButton>
                )
            })
        }
    }, {
        headerMode: 'none'
    }
);


const AppMainNav = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HeaderAvatar />,
            headerRight: (
                <HeaderButton margin="Right" onPress={() => navigation.navigate('CreateTwwet')}>
                    <SimpleLineIcons color={colors.PRIMARY} size={20} name="pencil" />
                </HeaderButton>
            )
        })
    },
    CreateTwwet: {
        screen: CreateTweetModal
    }
}, {
        cardStyle: {
            backgroundColor: '#F1F6FA'
        },
        navigationOptions: () => ({
            headerStyle: {
                backgroundColor: colors.WHITE
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: colors.SECONDARY
            }
        })
    }
);

class AppNavigator extends Component {
    render() {
        const nav = addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
        });

        if (!this.props.user.isAuthenticated) {
            return <AuthenticationScreen />
        }

        return <AppMainNav navigation1={nav} />
    }
}

export default connect(state => ({
    nav: state.nav,
    user: state.user
}))(AppNavigator);

export const router = AppMainNav.router;
