import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import SignupForm from '../components/SignupForm';

const Root = styled.View`
    flex:1;
    backgroundColor: ${props => props.theme.SECONDARY};
    position: relative;
`;

const ButtomSignupText = styled.Text`
    color: ${props => props.theme.WHITE};
    fontWeight: bold;
    fontSize: 20;
`;

const ButtomSignup = styled(Touchable).attrs({
    feedback: 'opacity'
}) `   
    height: 10%;   width:40%;
    backgroundColor: ${props => props.theme.PRIMARY};
    justifyContent: center;
    alignItems: center;
    position: absolute;
    top: 30%;
    right: 0;
    borderTopLeftRadius: 20;
    borderBottomLeftRadius: 20;
    shadowOpacity: 0.4;
    shadowOffset: 0px 4px;
    shadowColor: #000;
    elevation: 2;
`;

const BottomTextContainer = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20%;
    justifyContent: center;
    alignItems: center;
`;

const ButtomLogin = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 15, bottom: 15, right: 10, left: 10 }
}) `
    justifyContent: center;
    alignItems: center;
`;

const ButtomText = styled.Text`
    color: ${props => props.theme.WHITE};
    fontWeight: 400;
    fontSize: 14;
`;

const initialState = {
    showSignup: false,
    showLogin: false
};

class AuthenticationScreen extends Component {
    state = initialState;

    _onShowSignupFormPress = () => this.setState({ showSignup: true });
    _onBackPress = () => this.setState({ ...initialState });

    render() {
        if (this.state.showSignup) {
            return (
                <Root>
                    <SignupForm onBackPress={this._onBackPress} />
                </Root>
            )
        };

        return (
            <Root>
                <ButtomSignup onPress={this._onShowSignupFormPress}>
                    <ButtomSignupText>Get Started</ButtomSignupText>
                </ButtomSignup>
                <BottomTextContainer>
                    <ButtomLogin>
                        <ButtomText>
                            Already have an account?
                        </ButtomText>
                    </ButtomLogin>
                </BottomTextContainer>
            </Root>
        );
    }
}

export default AuthenticationScreen;