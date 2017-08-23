import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, View, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fakeavatar, colors } from '../utils/constants'

const avatarSize = 45;
const avatarRadius = avatarSize / 2;
const iconSize = 25;
const firstname = 'Scarlett';
const lastname = 'Johansson';
const info = '❝ Besame... las muestras publicas de afecto incomodan a las personas. (Black Widow)❞'

const Root = styled.View`
    flex:1;
`;
const TName = styled.Text`
    fontSize: 16;
    color: #333;
    fontWeight: bold;
`;
const T2 = styled.Text`
    fontSize: 16;
    color: #8e897d;
`;
const Info = styled.Text`
    marginTop: 5;
    fontSize: 14;
    color: #8e897d;
`;
const Card = styled.View`
    flexDirection: row;
    backgroundColor: #fff;
    marginBottom: 0.7
`;
const Spacevertical = styled.View`
    marginTop: 40;
`;
const Profil = styled.Image`
    height: ${avatarSize};
    width: ${avatarSize};
    borderRadius: ${avatarRadius};
    marginBottom: 15;
    marginLeft: 5;
    marginRight: 10;
    opacity: 1;
    marginTop: 13;
    justifyContent: center;
`;
const Metadata = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
`;

class ConfigsScreen extends Component {
    state = {  }
    
    logout(){
        Alert.alert('¡Bye bye!');
    }
    render() {
        return (
          <Root>
            <ScrollView>
                <Spacevertical>
                    <Card>
                        <Profil source={{uri: fakeavatar}} />
                        <Metadata>
                        <TName>{firstname} {lastname}</TName>
                        <Info>{info}</Info>
                        </Metadata>
                    </Card>
                    <Card>
                    <Icon name='ios-notifications' size={iconSize} style={{color: '#434343', margin: 15}}/>  
                    <Metadata>
                        <T2>Notifications</T2>
                    </Metadata>
                    </Card>
                    <Card>
                    <Icon name='ios-information-circle-outline' size={iconSize} style={{color: '#434343', margin: 15}}/>  
                    <Metadata>
                        <T2>Help</T2>
                    </Metadata>
                    </Card>
                    <Card>
                    <Icon name='md-log-out' size={iconSize} style={{color: '#434343', margin: 15}}/>  
                        <Metadata>
                            <TouchableWithoutFeedback onPress={this.logout}>
                                <View>
                                    <T2 style={{color:'red'}}>Sign out</T2>
                                </View>
                            </TouchableWithoutFeedback>
                        </Metadata>
                    </Card>
                    <Spacevertical>
                    <Card>
                        <Icon name='ios-mail-open' size={iconSize} style={{color: '#434343', margin: 15}}/>  
                        <Metadata>
                            <T2>Contact</T2>
                        </Metadata>
                    </Card>
                    <Card>
                        <Icon name='ios-heart' size={iconSize} style={{color: colors.PRIMARY, margin: 15}}/>  
                        <Metadata>
                            <T2>About Us</T2>
                        </Metadata>
                    </Card>
                    </Spacevertical>
                </Spacevertical>
            </ScrollView>  
          </Root>  
        );
    }
}

export default ConfigsScreen;