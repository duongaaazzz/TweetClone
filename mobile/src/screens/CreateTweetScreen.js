import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Touchable from '@appandflow/touchable';

import { colors } from '../utils/constants';

const Root = styled.View`
    backgroundColor: ${props => props.theme.WHITE};
    flex: 1;
    alignItems: center;
`;

const Wrapper = styled.View`
    height: 80%;
    width: 90%;
    paddingTop: 5;
    position: relative;
`;

const Input = styled.TextInput.attrs({
    placeholder: "what's happening?",
    multiline: true,
    maxLength: 150,
    selectionColor: Platform.OS === 'ios' && colors.PRIMARY,
    autoFocus: true
}) `
    fontSize: 18;
    height: 40%;
    width: 100%;
    color: ${props => props.theme.SECONDARY};
`;

const TweetButton = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 15, bottom: 15, right: 15, left: 15 }
}) `
    backgroundColor: ${props => props.theme.PRIMARY};
    alignItems: center;
    justifyContent: center;
    height: 30;
    width: 60;
    borderRadius: 30;
    position: absolute;
    top: 50%;
    right: 0;
`;

const TweetButtonText = styled.Text`
    color: ${props => props.theme.WHITE};
    fontSize: 16;
`;

const TextLengthInput = styled.Text`
    fontSize: 18;
    color: ${props => props.theme.PRIMARY};
    position: absolute;
    top: 40%;
    right: 5%;
`;

class CreateTweetScreen extends Component {
    state = {
        textInput: ''
    };

    get _textLength() {
        return 150 - this.state.textInput.length;
    }

    _onChangeTextInput = textInput => this.setState({ textInput });

    render() {
        return (
            <Root>
                <Wrapper>
                    <Input value={this.state.textInput} onChangeText={this._onChangeTextInput} />
                    <TextLengthInput>{this._textLength}</TextLengthInput>
                    <TweetButton>
                        <TweetButtonText> Tweet </TweetButtonText>
                    </TweetButton>
                </Wrapper>
            </Root>
        );
    }
}

export default CreateTweetScreen;