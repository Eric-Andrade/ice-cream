import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import SignupForm from '../components/SignupForm'

const login = 'Log in'
const signup = 'Sign Up';
const slogan = '❝ Change the World, One Scoop at a time... ❞';
const icecreamLogoSize = 120;
const avatarRadius = icecreamLogoSize / 2;

const Root = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.PRIMARY};
`;
const InfoContainer = styled.View`
    flex: 2;
    backgroundColor: ${props => props.theme.PRIMARY};
    justifyContent: center;
    alignSelf: stretch;
    alignItems: center;
`;
const Logo = styled.Image`
    height: ${icecreamLogoSize};
    width: ${icecreamLogoSize};
    borderRadius: ${avatarRadius};
    backgroundColor: ${props => props.theme.WHITE};
`;
const Slogan = styled.Text`
    color: ${props => props.theme.WHITE};
    width: 180;
    marginTop: 10;
    textAlign: center;
    fontSize: 15;
    fontStyle: italic;
    fontWeight: 600;
`;
const BottomContainer = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.WHITE};
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
    backgroundColor: ${props => props.theme.CHOCOLATE};
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
    color: ${props => props.theme.LIGHT_BROWN};
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
            <InfoContainer>
                <Logo source={require('../../assets/icons/app-icon.png')}/>
                <Slogan>
                    {slogan}
                </Slogan>
            </InfoContainer>
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