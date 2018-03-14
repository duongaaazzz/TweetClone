import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
    backgroundColor: ${props => props.theme.WHITE};
    flex: 1;
    alignItems: center;
`;

const Wrapper = styled.View`
    height: 80%;
    width: 90%;
    paddingTop: 5;
    backgroundColor: pink;
`;

const Input = styled.TextInput.attrs({
    multiline: true, 
}) `
    height: 40%;
    width: 100%;
    color: ${props => props.theme.SECONDARY};
`;


class CreateTweetScreen extends Component {
    render() {
        return (
            <Root>
                <Wrapper>
                    <Input />
                </Wrapper>
            </Root>
        );
    }
}

export default CreateTweetScreen;