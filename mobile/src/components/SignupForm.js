import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';

import { colors } from '../utils/constants';

const Root = styled.View`
    flex: 1;

`;

const T = styled.Text`

`;

const BackButtom = styled(Touchable).attrs({
    feedback: 'opacity'
}) `
    justifyContent: center;
    alignItems: center;
    position: absolute;
    top: 5%;
    left: 5%;
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
            </Root>
        );
    }
}

export default SignupForm;