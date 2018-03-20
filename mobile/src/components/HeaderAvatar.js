import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { withApollo } from 'react-apollo';

import { logout } from '../actions/user';

import Loading from './Loading';
import HeaderButton from './HeaderButton';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
    height: ${AVATAR_SIZE};
    width: ${AVATAR_SIZE};
    borderRadius: ${AVATAR_RADIUS};
`;

class HeaderAvatar extends Component {
    _onOpenActionSheetPress = () => {
        const options = ['Logout', 'Canel'];
        const destructiveButtonIndex = 0;

        this.props.showActionSheetWithOptions({
            options,
            destructiveButtonIndex
        }, buttomIndex => {
            if (buttomIndex === 0) {
                this.props.client.resetStore();
                return this.props.logout();
            }
        })
    }

    render() {
        if (!this.props.info) {
            return (
                <HeaderButton margin='Left' disabled>
                    <Loading size="small" />
                </HeaderButton>
            )
        }

        return (
            <HeaderButton margin='Left' onPress={this._onOpenActionSheetPress}>
                <Avatar source={{ uri: this.props.info.avatar }} />
            </HeaderButton>
        );
    }
}

export default withApollo(connect(state => ({
    info: state.user.info
}), { logout }
)(connectActionSheet(HeaderAvatar)));