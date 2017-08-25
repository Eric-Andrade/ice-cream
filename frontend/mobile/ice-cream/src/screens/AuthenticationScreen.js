import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { Font } from 'expo';
import SignupForm from '../components/SignupForm';

const login = 'Log in'
const signup = 'Sign Up';
const slogan = '❝Change the World, One Scoop at a time...❞';
const NameCompany = 'iceCream Unicorn';
const icecreamLogoSize = 120;
const avatarRadius = icecreamLogoSize / 2;

const Root = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.PRIMARY};
`;
const BackImage = styled.Image`
    flex: 2;
    resizeMode: cover;
`;
const InfoContainer = styled.View`
    flex: 2;
    backgroundColor: ${props => props.theme.PRIMARYRGBA};
    justifyContent: center;
    alignSelf: stretch;
    alignItems: center;
`;
const CompanyName = styled.Text`
    color: ${props => props.theme.WHITE};
    fontWeight: bold;
    marginBottom: 5
`
const Logo = styled.Image`
    height: ${icecreamLogoSize};
    width: ${icecreamLogoSize};
    borderRadius: ${avatarRadius};
    backgroundColor: ${props => props.theme.WHITE};
`;
const Slogan = styled.Text`
    color: ${props => props.theme.WHITE};
    width: 180;
    textAlign: center;
    fontSize: 14;
    fontStyle: italic;
    fontWeight: 400;
    marginTop: 15
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
    color: ${props => props.theme.LIGHT_BROWN200};
    fontWeight: 500;
    fontSize: 16;
`;
const initialState = { 
    showSignup: false,
    showLogin: false
 }

class AuthenticationScreen extends Component {
    state = {
        initialState,
        fontLoaded: false,
    };;
    
    async componentDidMount() {
        await Font.loadAsync({
            'Sacramento': require('../../assets/fonts/Sacramento/Sacramento-Regular.ttf'),
            'JosefinSans_Regular': require('../../assets/fonts/Josefin_Sans/JosefinSans-Regular.ttf'),
            'Lobster': require('../../assets/fonts/Lobster/Lobster-Regular.ttf'),
            'Roboto': require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
            'Tangerine': require('../../assets/fonts/Tangerine/Tangerine-Regular.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

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
                <BackImage style={{width: null, height: null}}
                    source={require('../../assets/10.jpg')}>   
                    <InfoContainer>
                        {
                            this.state.fontLoaded ? (
                            <CompanyName style={{fontFamily: 'Sacramento', fontSize: 37}}>
                                {NameCompany}
                            </CompanyName>
                            ) : null
                        }
                        <Logo source={require('../../assets/icons/app-icon.png')}/>
                        <Slogan style={{letterSpacing: 1}}>
                            {slogan}
                        </Slogan>
                    </InfoContainer>
                </BackImage>
                <BottomContainer>
                    <ButtonLogin>
                        <ButtonLoginText>{login}</ButtonLoginText>
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