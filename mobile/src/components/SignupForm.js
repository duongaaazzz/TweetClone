import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import { Platform, Keyboard, AsyncStorage } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors, fakeAvatar } from '../utils/constants';
import Loading from '../components/Loading';
import { login } from '../actions/user';

import SIGNUP_MUTATION from '../graphql/mutation/signup';

const Root = styled(Touchable).attrs({
    feedback: 'none'
}) `
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const BackButtom = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 15, bottom: 15, right: 15, left: 15 }
}) `
    justifyContent: center;
    alignItems: center;
    position: absolute;
    top: 5%;
    left: 5%;
    margin
`;

const Wrapper = styled.View`
    justifyContent: center;
    alignItems: center;
    width: 90%;
    height: 65%;
`;

const InputWrapper = styled.View`
    width: 80%; 
    height: 50;
    borderBottomWidth: 2;
    borderBottomColor: ${props => props.theme.LIGHT_GRAY};
    marginVertical: 5;
    justifyContent: flex-end;
`;

const Input = styled.TextInput.attrs({
    placeholderTextColor: colors.LIGHT_GRAY,
    selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
    autoCorrect: false
}) `
    height: 30;
    color: ${props => props.theme.WHITE}
`;

const ComfirmButtom = styled(Touchable).attrs({
    feedback: 'opacity',
}) `
    position: absolute;
    bottom: 5%;
    width: 65%;
    height: 40;
    backgroundColor: ${props => props.theme.PRIMARY};
    justifyContent: center;
    alignItems: center;
    borderRadius: 10;
    shadowColor: #000;
    shadowOffset: 0px 2px;
    shadowRadius: 5; 
    shadowOpacity: 0.2;
    elevation: 2
`;

const ComfirmTextButtom = styled.Text`
    color: ${props => props.theme.WHITE};
    fontWeight: 600;
`;

class SignupForm extends Component {
    state = {
        fullName: '',
        email: '',
        username: '',
        password: '',
        loading: false
    }

    _onOutsidePress = () => Keyboard.dismiss();
    _onChangeText = (text, type) => this.setState({ [type]: text });

    _checkIfNullInputDisabled() {
        const { fullName, email, username, password } = this.state;

        if (!fullName || !email || !password || !username) {
            return true
        }

        return false
    }

    _onSignUpPress = async () => {
        this.setState({ loading: true });

        const { fullName, email, password, username } = this.state;
        const avatar = fakeAvatar;

        try {
            const { data } = await this.props.mutate({
                variables: {
                    fullName,
                    email,
                    password,
                    username,
                    avatar
                }
            });

            await AsyncStorage.setItem('attwittercloneapplication', data.signup.token);
            this.setState({ loading: false });

            return this.props.login();
        } catch (error) {
            throw error;
        }

    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }

        return (
            <Root onPress={this._onOutsidePress}>
                <BackButtom onPress={this.props.onBackPress}>
                    <MaterialIcons
                        color={colors.WHITE}
                        size={30}
                        name="arrow-back"
                    />
                </BackButtom>
                <Wrapper>
                    <InputWrapper>
                        <Input
                            placeholder="Full Name"
                            autoCapitalize="words"
                            onChangeText={text => this._onChangeText(text, 'fullName')}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <Input
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={text => this._onChangeText(text, 'email')}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <Input
                            placeholder="Username"
                            autoCapitalize="none"
                            onChangeText={text => this._onChangeText(text, 'username')}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <Input
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={text => this._onChangeText(text, 'password')}
                        />
                    </InputWrapper>
                </Wrapper>

                <ComfirmButtom
                    onPress={this._onSignUpPress}
                    disabled={this._checkIfNullInputDisabled()}
                >
                    <ComfirmTextButtom>
                        Sign Up
                        </ComfirmTextButtom>
                </ComfirmButtom>
            </Root>
        );
    }
}

export default compose(
    graphql(SIGNUP_MUTATION),
    connect(undefined, { login }),
)(SignupForm);
