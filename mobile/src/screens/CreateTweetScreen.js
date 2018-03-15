import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform, Keyboard } from 'react-native';
import Touchable from '@appandflow/touchable';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors } from '../utils/constants';

import CREATE_TWEET_MUTATION from '../graphql/mutation/createTweet';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';

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

    get _buttonDisabled() {
        return this.state.textInput.length < 5;
    }

    _onChangeTextInput = textInput => this.setState({ textInput });

    _onCreateTweetPrees = async () => {
        const { user } = this.props;

        try {
            await this.props.mutate({
                variables: {
                    text: this.state.textInput
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    createTweet: {
                        __typename: 'Tweet',
                        text: this.state.textInput,
                        favoriteCount: 0,
                        _id: Math.round(Math.random() * -1000000),
                        createdAt: new Date(),
                        user: {
                            __typename: 'User',
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            avatar: user.avatar
                        }
                    }
                },
                update: (store, { data: { createTweet } }) => {
                    const data = store.readQuery({ query: GET_TWEETS_QUERY });

                    if (!data.getTweets.find(t => t._id === createTweet._id)) {
                        store.writeQuery({
                            query: GET_TWEETS_QUERY,
                            data: { getTweets: [{ ...createTweet }, ...data.getTweets] }
                        })
                    }
                }
            });

            Keyboard.dismiss();
            this.props.navigation.goBack(null);

        } catch (error) {
            throw error
        }
    };

    render() {
        return (
            <Root>
                <Wrapper>
                    <Input value={this.state.textInput} onChangeText={this._onChangeTextInput} />
                    <TextLengthInput>{this._textLength}</TextLengthInput>
                    <TweetButton onPress={this._onCreateTweetPrees} disabled={this._buttonDisabled}>
                        <TweetButtonText> Tweet </TweetButtonText>
                    </TweetButton>
                </Wrapper>
            </Root>
        );
    }
}

export default compose(
    graphql(CREATE_TWEET_MUTATION),
    connect(state => ({ user: state.user.info }))
)(CreateTweetScreen);