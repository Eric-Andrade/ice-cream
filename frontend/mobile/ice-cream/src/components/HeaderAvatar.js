import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { withApollo } from 'react-apollo';
import { fakeavatar, colors } from '../utils/constants'
import Loading from './Loading';
import { logout } from '../actions/client' 
import ButtonHeader from './ButtonHeader';

const avatarSize = 30;
const avatarRadius = avatarSize / 2;
const Avatar = styled.Image`
    height: ${avatarSize};
    width: ${avatarSize};
    borderRadius: ${avatarRadius};
`;

class HeaderAvatar extends Component {
    _onOpenActionSheet = () =>{
        const options = ['Logout', 'Cancel'];
        const destructiveButtonIndex = 0;
        this.props.showActionSheetWithOptions({
            options,
            destructiveButtonIndex
        }, buttonIndex =>{
            if(buttonIndex === 0){
                this.props.client.resetStore();
                this.props.logout();

            }
        })
    }
    render() {
        if(!this.props.info){
            return (
                <ButtonHeader side="left" disabled>
                    <Loading size="small" color={colors.PRIMARY}/>
                </ButtonHeader>
            )
        }
            return (
                <ButtonHeader side="left" onPress={this._onOpenActionSheet}>
                    <Avatar source={{uri: this.props.info.avatar }}/>
                </ButtonHeader>
            );
    }
}

export default withApollo(connect(state => ({info: state.clients.info }), { logout })(
                connectActionSheet(HeaderAvatar),
            ));