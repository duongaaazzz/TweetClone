import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import { Platform } from 'react-native';

import { colors } from '../utils/constants';

const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const T = styled.Text``;

const BackButtom = styled(Touchable).attrs({
    feedback: 'opacity'
}) `
    justifyContent: center;
    alignItems: center;
    position: absolute;
    top: 5%;
    left: 5%;
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
    state = {}
    render() {
        return (
            <Root>
                <BackButtom onPress={this.props.onBackPress}>
                    <MaterialIcons
                        color={colors.WHITE}
                        size={30}
                        name="arrow-back"
                    />
                </BackButtom>
                <Wrapper>
                    <InputWrapper>
                        <Input placeholder="Full Name" />
                    </InputWrapper>

                    <InputWrapper>
                        <Input placeholder="Email" />
                    </InputWrapper>

                    <InputWrapper>
                        <Input placeholder="Username" />
                    </InputWrapper>

                    <InputWrapper>
                        <Input placeholder="Password" />
                    </InputWrapper>
                </Wrapper>

                <ComfirmButtom>
                    <ComfirmTextButtom>
                        Sign Up
                        </ComfirmTextButtom>
                </ComfirmButtom>
            </Root>
        );
    }
}

export default SignupForm;