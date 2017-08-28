import React, { Component } from 'react';
import { Platform, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { Font } from 'expo';
import SignupForm from '../components/SignupForm';
import {colors} from '../utils/constants'

const login = 'Log in'
const signup = 'Don´t have an account yet? Sign up';
const slogan = '❝Change the World, One Scoop at a time...❞';
const NameCompany = 'iceCream Unicorn';
const icecreamLogoSize = 120;
const avatarRadius = icecreamLogoSize / 2;

const Root = styled.View`
    flex: 1;
    position: relative; 
    justifyContent: center;
    backgroundColor: ${props => props.theme.LIGHT_GRAY100};
`;
const BackImage = styled.Image`
    flex: 1;
    resizeMode: cover;
    zIndex: 1;
`;
const InfoContainer = styled.View`
    flex: 1;
    top: 10%;
    alignSelf: stretch;
    alignItems: center;
`;
const CompanyName = styled.Text`
    color: ${props => props.theme.LIGHT_GRAY200};
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
    color: ${props => props.theme.LIGHT_GRAY200};
    width: 190;
    textAlign: center;
    fontSize: 14;
    fontStyle: italic;
    fontWeight: 600;
    marginTop: 15
`;
const BottomContainer = styled.View`
   marginTop: 30;
   width: 100%;
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
    marginTop: 15;
    borderColor: ${props => props.theme.GRAY};
    backgroundColor: ${props => props.theme.GRAY};
    justifyContent: center;
    alignItems: center;
    shadowOpacity: 0.3;
    shadowRadius: 5;
    shadowOffset: 0px 3px;
    shadowColor: #000;
    elevation: 2;
`;
const ButtonLoginText = styled.Text`
    color: ${props => props.theme.LIGHT_GRAY200};
    fontWeight: 500;
    fontSize: 16;
`;
const ButtonSignup = styled(Touchable).attrs({
    feedback: 'opacity'
})`
    marginTop: 10;
    borderRadius: 10;
    justifyContent: center;
    alignItems: center;
    zIndex: 1;
`;
const ButtonSignupText = styled.Text`
    color: ${props => props.theme.LIGHT_GRAY200};
    fontWeight: 500;
    fontSize: 15;
    zIndex: 1;
`;
const InputWrapper = styled.View`
    height: 45;
    width: 70%;
    borderBottomWidth: 1;
    borderBottomColor: ${props => props.theme.LIGHT_GRAY200};;
    justifyContent: flex-end;
`;
const Input = styled.TextInput.attrs({
    placeholderTextColor: colors.LIGHT_GRAY200,
    selectionColor: Platform.OS === 'ios' ? colors.GRAY : undefined,
    autoCorrect: false,
})`
    alignSelf: center;
    width: 100%;
    height: 30;
    color: ${props => props.theme.LIGHT_GRAY200};
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
    _onOutSidePress = () => Keyboard.dismiss();
    _onShowSignupPress = () => this.setState({ showSignup: true });
    _onBackPress = () => this.setState({ ...initialState });
    _onChangeText = (text, type) => this.setState({[type]:text});
    render() {
        if (this.state.showSignup) {
            return(
                <Root>
                    <SignupForm onBackPress={this._onBackPress}/>
                </Root>
            )
        }
        return (
            <Root onPress={this._onOutSidePress}>
                <BackImage style={{width: null, height: null}}
                    source={require('../../assets/background.png')}>   
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
                        <BottomContainer>
                            <InputWrapper>
                                <Input 
                                placeholder="Email or phone"                                
                                underlineColorAndroid={colors.PRIMARY}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={text => this._onChangeText(text, 'email')}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <Input
                                placeholder="Password"                                
                                underlineColorAndroid={colors.PRIMARY}
                                secureTextEntry
                                onChangeText={text => this._onChangeText(text, 'password')}
                                />
                            </InputWrapper>
                            <ButtonLogin>
                                <ButtonLoginText>{login}</ButtonLoginText>
                            </ButtonLogin>
                            <ButtonSignup onPress={this._onShowSignupPress}>
                                <ButtonSignupText>{signup}</ButtonSignupText>
                            </ButtonSignup>
                        </BottomContainer>     
                    </InfoContainer>
                </BackImage>
            </Root>
        );
    }
}

export default AuthenticationScreen;