import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Button = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: {top: 25, bottom: 25, right: 25, left: 25}
})`
    marginRight: ${props => props.side === 'right' ? 15 : 0};
    marginLeft: ${props => props.side === 'left' ? 15 : 0};
    justifyContent: center;
    alignItems: center;
`;

export default function ButtonHeader({ side, children, onPress, disabled }){
    return (
        <Button onPress={onPress} disabled={disabled} side={side}>
            {children}
        </Button>
    )
}