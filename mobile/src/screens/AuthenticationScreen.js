import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Root = styled.View`
    flex:1;
    backgroundColor: ${props => props.theme.SECONDARY};
    position: relative;
`;

const ButtomLoginText = styled.Text`
    color: ${props => props.theme.WHITE};
    fontWeight: bold;
    fontSize: 20;
`;

const ButtonLogin = styled(Touchable).attrs({
    feedback: 'opacity'
}) `
    height: 10%;
    width:40%;
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

const ButtomCreateAccount = styled(Touchable).attrs({
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

class AuthenticationScreen extends Component {
    render() {
        return (
            <Root>
                <ButtonLogin>
                    <ButtomLoginText>Get Started</ButtomLoginText>
                </ButtonLogin>
                <BottomTextContainer>
                    <ButtomCreateAccount>
                        <ButtomText>
                            Already have an account?
                        </ButtomText>
                    </ButtomCreateAccount>
                </BottomTextContainer>
            </Root>
        );
    }
}

export default AuthenticationScreen;