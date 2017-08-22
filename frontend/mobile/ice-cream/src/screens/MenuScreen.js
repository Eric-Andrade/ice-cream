import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View`

`;
const T = styled.Text`

`;

class MenuScreen extends Component {
    state = {  }
    render() {
        return (
          <Root>
              <T>Menu</T>
          </Root>  
        );
    }
}

export default MenuScreen;