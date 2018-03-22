import React from 'react';
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

function FeedCard({ text, user, createdAt, favoriteCount }) {
    return (
        < Root >
            <FeedCardHeader {...user} createdAt={createdAt} />

            <CardContentContainer >
                <CardContentText>
                    {text}
                </CardContentText>
            </CardContentContainer>

            <FeedCardBottom favoriteCount={favoriteCount} />

        </Root>
    )
}

export default FeedCard;
