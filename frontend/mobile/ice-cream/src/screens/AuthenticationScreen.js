import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import SignupForm from '../components/SignupForm'

const login = 'Log in'
const signup = 'Sign Up';

const Root = styled.View`
    flex: 1
    backgroundColor: ${props => props.theme.PRIMARY};
    position: relative;
`;
const BottomContainer = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 275;
    backgroundColor: #fff;
    justifyContent: center;
    alignItems: center;
`;
const ButtonLogin = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: {top: 15, bottom: 15, right: 15, left: 15}
})`
    borderStyle: solid;
    borderRadius: 10;
    borderWidth: 1;
    width: 70%;
    height: 50;
    borderColor: ${props => props.theme.LIGHT_BROWN400};
    justifyContent: center;
    alignItems: center;
`;
const ButtonLoginText = styled.Text`
    color: ${props => props.theme.LIGHT_BROWN400};
    fontWeight: 500;
    fontSize: 16;
`;
const ButtonSignup = styled(Touchable).attrs({
    feedback: 'opacity'
})`
    position: absolute;
    bottom: 15%;
    width: 70%;
    height: 50;
    backgroundColor: ${props => props.theme.BROWN};
    borderRadius: 10;
    justifyContent: center;
    alignItems: center;
    shadowOpacity: 0.3;
    shadowRadius: 5;
    shadowOffset: 0px 3px;
    shadowColor: #000;
    elevation: 2
`;
const ButtonSignupText = styled.Text`
    color: ${props => props.theme.LIGHT_BROWN200};
    fontWeight: 500;
    fontSize: 16;
`;
const initialState = { 
    showSignup: false,
    showLogin: false
 }

class AuthenticationScreen extends Component {
    state = initialState

    _onShowSignupPress = () => this.setState({ showSignup: true });
    _onBackPress = () => this.setState({ ...initialState });

    render() {
        if (this.state.showSignup) {
            return(
                <Root>
                    <SignupForm onBackPress={this._onBackPress}/>
                </Root>
            )
        }
        return (
          <Root>
              <BottomContainer>
                <ButtonLogin>
                    <ButtonLoginText>
                        {login}
                    </ButtonLoginText>
                </ButtonLogin>  
                <ButtonSignup onPress={this._onShowSignupPress}>
                    <ButtonSignupText>{signup}</ButtonSignupText>
                </ButtonSignup> 
              </BottomContainer>
          </Root>  
        );
    }
}

export default AuthenticationScreen;