import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import SignupForm from '../components/SignupForm'

const alreadyaccount = 'Already have a account?'
const login = 'Sign Up';

const Root = styled.View`
    flex: 1
    backgroundColor: ${props => props.theme.PRIMARY};
    position: relative;
`;
const ButtonSignupText = styled.Text`
    color: ${props => props.theme.LIGHT_BROWN};
    fontWeight: 500;
    fontSize: 18;
`;
const ButtonSignup = styled(Touchable).attrs({
    feedback: 'opacity'
})`
    height: 75;
    width: 150;
    backgroundColor: ${props => props.theme.WHITE};
    justifyContent: center;
    alignItems: center;
    position: absolute;
    top: 30%;
    right: 0%;
    borderTopLeftRadius: 20;
    borderBottomLeftRadius: 20;
    shadowOpacity: 0.3;
    shadowRadius: 5;
    shadowOffset: 0px 3px;
    shadowColor: #000
`;
const BottomTextContainer = styled.View`
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
    justifyContent: center;
    alignItems: center;
`;

const ButtonLoginText = styled.Text`
    color: ${props => props.theme.LIGHT_BROWN};
    fontWeight: 400;
    fontSize: 16;
`
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
              <ButtonSignup onPress={this._onShowSignupPress}>
                <ButtonSignupText>{login}</ButtonSignupText>
              </ButtonSignup> 
              <BottomTextContainer>
                <ButtonLogin>
                    <ButtonLoginText>
                        {alreadyaccount}
                    </ButtonLoginText>
                </ButtonLogin>
              </BottomTextContainer>
          </Root>  
        );
    }
}

export default AuthenticationScreen;