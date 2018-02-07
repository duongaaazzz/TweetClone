import React, { Component } from 'react';
import styled from 'styled-components/native';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { fakeAvatar } from '../../utils/constants';

const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`
        height: 50;
        flexDirection: row;
        alignItems: stretch;
`;

const AvatarContainer = styled.View`
        flex:0.2;
        justifyContent: center;
`;

const Avatar = styled.Image`
        height: ${AVATAR_SIZE};
        width:  ${AVATAR_SIZE};
        borderRadius: ${AVATAR_RADIUS};
`;

const MetaContainer = styled.View`
        flex:1;
`;

const MetaTopContainer = styled.View`
        flex:1;
        alignItems: stretch;
        flexDirection: row;
        alignItems: center;
        justifyContent: flex-start;
`;

const MetaBottomContainer = styled.View`
        flex:0.8;
        alignItems: stretch;
        alignItems: flex-start;
        justifyContent: center;
`;

const MetaText = styled.Text`
        fontSize: 14;
        fontWeight: 600;
        color: ${props => props.theme.LIGHT_GRAY}
`;

const MetaFullName = styled.Text`
        fontSize: 16;
        fontWeight: bold;
        color: ${props => props.theme.SECONDARY}
`;

function FeedCardHeader({ username, firstName, lastName, avatar, createdAt }) {
        return (
                <Root >
                        <AvatarContainer >
                                <Avatar source={{ uri: fakeAvatar || avatar }} />
                        </AvatarContainer>

                        <MetaContainer>
                                <MetaTopContainer>
                                        <MetaFullName>
                                                {firstName} {lastName}
                                        </MetaFullName>

                                        <MetaText style={{ marginLeft: 5 }}>
                                                @{username}
                                        </MetaText>
                                </MetaTopContainer>

                                <MetaBottomContainer >
                                        <MetaText>
                                                {distanceInWordsToNow(createdAt)} ago
                                        </MetaText>
                                </MetaBottomContainer>
                        </MetaContainer>
                </Root>
        );
}

export default FeedCardHeader;
