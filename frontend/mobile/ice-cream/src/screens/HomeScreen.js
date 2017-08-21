import React, { Component } from 'react';
import styled from 'styled-components/native';
import OrderCard from '../components/OrderCard/OrderCard'

const Root = styled.View`
    flex:1;
    backgroundColor: #f2f2f2;
    paddingTop: 20;
    `;
const List = styled.ScrollView``    

class HomeScreen extends Component{
    state = {

    }

    render(){
        return(
            <Root>
                <List>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                    <OrderCard/>
                </List>
            </Root>
        )
    }
}

export default HomeScreen;