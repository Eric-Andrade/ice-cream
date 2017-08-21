import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  alignItems: center;
  justifyContent: center;
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
  width: 90%;
  alignSelf: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.LIGHT_BROWN};
  fontSize: 18;
  textAlign: center;
`;

export default function Welcome() {
  return (
    <Root>
      <Text>¡Welcome to iceCream!</Text>
    </Root>
  )
}
