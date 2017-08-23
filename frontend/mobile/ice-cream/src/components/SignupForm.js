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
    alignItems: center;
`;
const Wrapper = styled.View`
    flex: 1;
    alignSelf: stretch;
    alignItems: center;
    justifyContent: center;
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
    color: ${props => props.theme.LIGHT_BROWN400};
    fontWeight: 500;
    fontSize: 16;
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
                  <Entypo color={colors.WHITE} size={27} name="chevron-thin-left" />
              </BackButton>
              <Wrapper>
                <InputWrapper>
                    <Input 
                    placeholder="Full Name"
                    selectionColor={colors.CHOCOLATE}
                    underlineColorAndroid={colors.PRIMARY}
                    autoCapitalize="words"
                    onChangeText={text => this._onChangeText(text, 'fullName')}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input 
                    placeholder="Email"
                    selectionColor={colors.CHOCOLATE}
                    underlineColorAndroid={colors.PRIMARY}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={text => this._onChangeText(text, 'email')}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input 
                    placeholder="Username"
                    selectionColor={colors.CHOCOLATE}
                    underlineColorAndroid={colors.PRIMARY}
                    autoCapitalize="none"
                    onChangeText={text => this._onChangeText(text, 'username')}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                    placeholder="Password"
                    selectionColor={colors.CHOCOLATE}
                    underlineColorAndroid={colors.PRIMARY}
                    secureTextEntry
                    onChangeText={text => this._onChangeText(text, 'password')}
                    />
                </InputWrapper>
              </Wrapper>
              <ButtonConfirm onPress={this._onSignupPress} disabled={this._checkIfDisabled()}>
                <ButtonConfirmText>
                    {signup}
                </ButtonConfirmText>
              </ButtonConfirm>
          </Root>  
        );
    }
}

export default compose(
        graphql(signupMutation),
        connect(undefined, { login }),
            )(SignupForm);