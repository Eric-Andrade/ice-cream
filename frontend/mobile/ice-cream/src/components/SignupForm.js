import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons }  from '@expo/vector-icons'
import Touchable from '@appandflow/touchable';
import { Platform, Keyboard } from 'react-native';
import { colors } from '../utils/constants';

const signup = 'Sign Up'

const Root = styled(Touchable).attrs({
    feedback: 'none'
})`
    flex: 1;
    position: relative;
    justifyContent: center;
    alignItems: center

`;
const Wrapper = styled.View`
    flex: 1;
    alignSelf: stretch;
    alignItems: center;
    justifyContent: center;
`;
const T = styled.Text`
    color: ${props => props.theme.WHITE};
`;
const BackButton = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: {top: 15, bottom: 15, right: 15, left: 15}
})`
    justifyContent: center;
    alignItems: center;
    position: absolute;
    top: 5%;
    left: 5%;
    zIndex: 1;
`;
const ButtonConfirm = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: {top: 15, bottom: 15, right: 15, left: 15}
})`
    position: absolute;
    bottom: 15%;
    width: 70%;
    height: 50;
    backgroundColor: ${props => props.theme.WHITE};
    borderRadius: 10;
    justifyContent: center;
    alignItems: center;
    shadowOpacity: 0.2;
    shadowRadius: 5;
    shadowOffset: 0px 2px;
    shadowColor: #000;
    elevation: 2
`;
const ButtonConfirmText = styled.Text`
    color: ${props => props.theme.LIGHT_BROWN};
    fontWeight: 600
`;
const InputWrapper = styled.View`
    height: 50;
    width: 80%;
    borderBottomWidth: 1;
    borderBottomColor: ${props => props.theme.WHITE};
    marginVertical: 5;
    justifyContent: flex-end;
`;
const Input = styled.TextInput.attrs({
    placeholderTextColor: colors.WHITE,
    selectionColor: Platform.OS === 'ios' ? colors.WHITE : undefined,
    autoCorrect: false,
})`
    height: 30;
    color: ${props => props.theme.WHITE};
`
class SignupForm extends Component {
    state = { 
        fullname: '',
        email: '',
        password: '',
        username: '',

     }

    _onOutSidePress = () => Keyboard.dismiss();
    _onChangeText = (text, type) => this.setState({[type]:text});
    _checkIfDisabled(){
        const { fullname, email, username, password } = this.state;
        if( !fullname || !email || !username || !password ){
            return true
        }
        return false
    }
    render() {
        return (
          <Root onPress={this._onOutSidePress}>
              <BackButton onPress={this.props.onBackPress}> 
                  <MaterialIcons color={colors.WHITE} size={27} name="arrow-back" />
              </BackButton>
              <Wrapper>
                <InputWrapper>
                    <Input 
                    placeholder="Full Name"
                    autoCapitalize="words"
                    onChangeText={text => this._onChangeText(text, 'fullname')}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input 
                    placeholder="Email"
                    Keyboard="email-adress"
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
              <ButtonConfirm  disabled={this._checkIfDisabled()}>
                <ButtonConfirmText>
                    {signup}
                </ButtonConfirmText>
              </ButtonConfirm>
          </Root>  
        );
    }
}

export default SignupForm;