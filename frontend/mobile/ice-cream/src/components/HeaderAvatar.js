import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { connect } from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { withApollo } from 'react-apollo';
import { fakeavatar, colors } from '../utils/constants'
import Loading from './Loading';
import { logout } from '../actions/client' 

const avatarSize = 30;
const avatarRadius = avatarSize / 2;
const Avatar = styled.Image`
    height: ${avatarSize};
    width: ${avatarSize};
    borderRadius: ${avatarRadius};
`;
const Button = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: {top: 25, bottom: 25, right: 25, left: 25}
})`
    marginLeft: 15;
    justifyContent: center;
    alignItems: center;
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
                <Button disabled>
                    <Loading size="small" color={colors.PRIMARY}/>
                </Button>
            )
        }
        return (
            <Button onPress={this._onOpenActionSheet}>
                <Avatar source={{uri: this.props.info.avatar }}/>
            </Button>
        );
    }
}

export default withApollo(connect(state => ({info: state.clients.info }), { logout })(
                connectActionSheet(HeaderAvatar),
            ));