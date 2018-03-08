import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import { Platform, Keyboard } from 'react-native';

import { colors } from '../utils/constants';

const Root = styled(Touchable).attrs({
    feedback: 'none'
}) `
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const BackButtom = styled(Touchable).attrs({
    feedback: 'opacity'
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
        password: ''
    }

    _onOutsidePress = () => Keyboard.dismiss();
    _onChangeText = (text, type) => this.setState({ [type]: text });

    _checkIfDisabled() {
        const { fullName, email, username, password } = this.state;

        if (!fullName || !email || !password) {
            return true
        }

        return false
    }

    render() {
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

                <ComfirmButtom disabled={this._checkIfDisabled()}>
                    <ComfirmTextButtom>
                        Sign Up
                        </ComfirmTextButtom>
                </ComfirmButtom>
            </Root>
        );
    }
}

export default SignupForm;