import React, { Component } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { colors } from '../utils/constants';

const Root = styled.View`
    flex: 1;
    alignItems: center;
    backgroundColor: ${props => props.theme.WHITE};
`;
const Wrapper = styled.View`
    height: 80%;
    width: 90%;
    paddingTop: 5;
    position: relative;
`;
const Input = styled.TextInput.attrs({
    multiline: true,
    maxLength: 140,
    selectionColor: Platform.OS === 'ios' && colors.PRIMARY100,
    placeholder: "What do you fancy now?",
    autoFocus: true
})`
    height: 40%;
    width: 100%;
    fontSize: 18;
    color: #333
`;
const CreateOrderButton = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: {top: 25, bottom: 25, right: 25, left: 25}
})`
    backgroundColor: ${props => props.theme.PRIMARY};
    alignItems: center;
    justifyContent: center;
    width: 80;
    height: 40;
    borderRadius: 25;
    position: absolute;
    top: 60%;
    right: 0
`;
const CreateOrderText = styled.Text`
    color: ${props => props.theme.WHITE};
    fontSize: 16    
`;

const TextLenght = styled.Text`
    color: ${props => props.theme.PRIMARY100};
    fontSize: 16;
    position: absolute;
    top: 55%;
    right: 5%
`;

class NewOrderScreen extends Component {
    state = { 
        text:''
     }

     _onChangeText = text => this.setState({text}) 
     get _textLenght(){
         return 140 - this.state.text.length;
     }
    render() {
        return (
          <Root>
              <Wrapper>
                <Input value={this.state.text} onChangeText={this._onChangeText}/>
                <TextLenght>
                    {this._textLenght}              
                </TextLenght>
                <CreateOrderButton>
                    <CreateOrderText>To order</CreateOrderText>
                </CreateOrderButton>
              </Wrapper>
          </Root>
        );
    }
}

export default NewOrderScreen;