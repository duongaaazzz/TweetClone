import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import Loading from './Loading';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
    height: ${AVATAR_SIZE};
    width: ${AVATAR_SIZE};
    borderRadius: ${AVATAR_RADIUS};
`;

const Buttom = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 15, bottom: 15, right: 15, left: 15 }
}) `
    justifyContent: center;
    alignItems: center;
    marginLeft: 15;
`;

class HeaderAvatar extends Component {
    render() {
        if (!this.props.info) {
            return (
                <Buttom disabled>
                    <Loading size="small" />
                </Buttom>
            )
        }

        return (
            <Buttom>
                <Avatar source={{ uri: this.props.info.avatar }} />
            </Buttom>
        );
    }
}

export default connect(state => ({ info: state.user.info }))(HeaderAvatar);