import React from 'react';
import styled from 'styled-components/native';
import { fakeavatar } from '../../utils/constants'

const avatarSize = 45;
const avatarRadius = avatarSize / 2;
const username = 'EricTorres';
const firstname = 'Eric';
const lastname = 'Torres Andrade';
const createdAt = '1 day ago'
const avatar = fakeavatar;

const Root = styled.View`
    height: 50;
    flexDirection: row;
    alignItems: center;
`;
const AvatarContainer = styled.View`
    flex:0.2
    paddingLeft: 5;
    justifyContent: center;
    alignSelf: stretch;
`;
const Avatar = styled.Image`
    height: ${avatarSize};
    width: ${avatarSize};
    borderRadius: ${avatarRadius};
`;
const MetaContainer = styled.View`
    flex:1;
    alignSelf: stretch;
    marginTop: 5
`;
const MetaTopContainer = styled.View`
    flex: 1;
    alignSelf: stretch;
    flexDirection: row;
    alignItems: center;
    justifyContent: flex-start;
`;
const MetaBottomContainer = styled.View`
    flex: 0.8;
    alignSelf: stretch;
    alignItems: flex-start;
    justifyContent: center;
`;
const MetaText = styled.Text`
    fontSize: 14;
    fontWeight: 500;
    color: ${props => props.theme.LIGHT_GRAY}
`;
const MetaFullName = styled.Text`
    fontSize: 16;
    fontWeight: 700;
    color: ${props => props.theme.SECONDARY}
`;

function OrderCardHeader(){
    return(
        <Root>
            <AvatarContainer>
                <Avatar source={{uri: avatar}}/>
            </AvatarContainer>
            <MetaContainer>
                <MetaTopContainer>
                    <MetaFullName>
                        {firstname} {lastname}
                    </MetaFullName>
                    <MetaText style={{marginLeft: 5}}>
                        @{username}
                    </MetaText>
                </MetaTopContainer>
                <MetaBottomContainer>
                    <MetaText>
                        {createdAt}
                    </MetaText>
                </MetaBottomContainer>
            </MetaContainer>
        </Root>
    )
}

export default OrderCardHeader;