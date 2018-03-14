import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Buttom = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 15, bottom: 15, right: 15, left: 15 }
}) `
    marginRight: ${props => props.margin === 'right' ? 15 : 0};
    marginLeft: ${props => props.margin === 'left' ? 15 : 0};
    justifyContent: center;
    alignItems: center;
    marginLeft: 15;
`;

export default function HeaderButton({ margin, children, onPress, disable }) {
    return (
        <Buttom onPress={onPress} disable={disable} margin={margin}>
            {children}
        </Buttom>
    )
}