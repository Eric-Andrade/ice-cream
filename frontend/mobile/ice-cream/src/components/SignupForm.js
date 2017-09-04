import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Entypo }  from '@expo/vector-icons'
import Touchable from '@appandflow/touchable';
import { Platform, Keyboard, AsyncStorage } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { colors, fakeavatar } from '../utils/constants';
import signupMutation from '../graphql/mutations/signup'
import Loading from '../components/Loading';
import { login } from '../actions/client'


const signup = 'Create account'

const Root = styled(Touchable).attrs({
    feedback: 'none'
})`
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
const Wrapper = styled.View`
    flex: 1;
    alignSelf: stretch;
    alignItems: center;
    justifyContent: center;
    backgroundColor: ${props => props.theme.LIGHT_GRAY100RGBA};
`;
const BackButton = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: {top: 25, bottom: 25, right: 25, left: 25}
})`
    justifyContent: center;
    alignItems: center;
    position: absolute;
    top: 5%;
    left: 5%;
    zIndex: 2;
`;
const ButtonConfirm = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: {top: 15, bottom: 15, right: 15, left: 15}
})`
    marginTop: 15;
    width: 70%;
    height: 50;
    backgroundColor: ${props => props.theme.GRAY};
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
    color: ${props => props.theme.LIGHT_GRAY200};
    fontWeight: 500;
    fontSize: 16;
`;
const InputWrapper = styled.View`
    height: 45;
    width: 70%;
    borderBottomWidth: 1;
    borderBottomColor: ${props => props.theme.LIGHT_GRAY200};
    justifyContent: flex-end;
`;
const Input = styled.TextInput.attrs({
    placeholderTextColor: colors.LIGHT_GRAY200,
    selectionColor: Platform.OS === 'ios' ? colors.GRAY : undefined,
    autoCorrect: false,
})`
    alignSelf: center;
    height: 30;
    width: 100%;
    color: ${props => props.theme.LIGHT_GRAY200};
`
class SignupForm extends Component {
    state = { 
        fullName: '',
        email: '',
        password: '',
        username: '',
        loading: false
     }

    _onOutSidePress = () => Keyboard.dismiss();
    _onChangeText = (text, type) => this.setState({[type]:text});
    _checkIfDisabled(){
        const { fullName, email, username, password } = this.state;
        if( !fullName || !email || !username || !password ){
            return true
        }
        return false
    }
    _onSignupPress = async () => {
        this.setState({ loading: true})
        const { fullName, email, password, username} = this.state;
        const avatar = fakeavatar;

        try {
            const { data } = await this.props.mutate({
                variables: {
                    fullName, 
                    email, 
                    password,
                    username,
                    avatar
                }
            });
            await AsyncStorage.setItem('@icecream', data.signupClient.token);
                this.setState({ loading: false });
                return this.props.login();
        } catch (error) {
            throw error;
        }
    }

    render() {
        if(this.state.loading){
            return <Loading />
        }

        return (
          <Root onPress={this._onOutSidePress}>
              <BackButton onPress={this.props.onBackPress}> 
                <Entypo color={colors.LIGHT_GRAY200} size={27} name="chevron-thin-left" />
              </BackButton>
              <BackImage style={{width: null, height: null}}
                    source={require('../../assets/background1.png')}>   
                <Wrapper>
                    <InputWrapper>
                        <Input 
                        placeholder="Full Name"
                        returnKeyType={"next"}
                        autoCapitalize="words"
                        onChangeText={text => this._onChangeText(text, 'fullName')}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={() => this.emailInput.focus()}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input 
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => this._onChangeText(text, 'email')}
                        underlineColorAndroid="transparent"
                        ref={(input) => {this.emailInput = input }}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input 
                        placeholder="Username"
                        autoCapitalize="none"
                        onChangeText={text => this._onChangeText(text, 'username')}
                        underlineColorAndroid="transparent"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={text => this._onChangeText(text, 'password')}
                        underlineColorAndroid="transparent"
                        />
                    </InputWrapper>
                    <ButtonConfirm onPress={this._onSignupPress} disabled={this._checkIfDisabled()}>
                        <ButtonConfirmText>
                            {signup}
                        </ButtonConfirmText>
                    </ButtonConfirm>
                </Wrapper>
            </BackImage>    
          </Root>  
        );
    }
}

export default compose(
        graphql(signupMutation),
        connect(undefined, { login }),
            )(SignupForm);