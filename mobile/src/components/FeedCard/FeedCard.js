import React, { Component } from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';


const Root = styled.View`
        minHeight: 180;
        width: 100%;
        shadowColor: ${props => props.theme.SECONDARY};
        shadowOffset: 0px 2px;
        shadowRadius:2; 
        shadowOpacity: 0.1;
        backgroundColor: ${props => props.theme.WHITE};
        padding: 5px; 
        marginVertical: 5;
`;

const CardContentContainer = styled.View`
        flex:1;
        padding: 5px 10px 5px 0px;
`;

const CardContentText = styled.Text`
        fontSize: 14;
        textAlign: left;
        fontWeight: 500;
        color: ${props => props.theme.SECONDARY};
`;

const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ratione ';

function FeedCard() {
        return (
                < Root >
                        <FeedCardHeader />

                        <CardContentContainer >
                                <CardContentText>
                                        {text}
                                </CardContentText>
                        </CardContentContainer>

                        <FeedCardBottom />

                </Root>
        )
}

export default FeedCard;
