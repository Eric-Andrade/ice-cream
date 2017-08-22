import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import OrderCard from '../components/OrderCard/OrderCard';
import getOrdersQuery from '../graphql/queries/getOrders'

const Root = styled.View`
    flex:1;
    `;


class OrdersScreen extends Component{
    state = {

    }
    _renderItem = ({item}) => <OrderCard {...item} />

    render(){
        const { data } = this.props;
        if(data.loading){
            return(
                <Root>
                    <ActivityIndicator size="large"/>
                </Root>
            )
        }
        return(
            <Root>
                <FlatList 
                    contentContainerStyle={{
                        alignSelf: 'stretch'
                    }}
                    data={data.getOrders}
                    keyExtractor={item => item._id}
                    renderItem={this._renderItem}
                />
            </Root>
        )
    }
}

export default graphql(getOrdersQuery)(OrdersScreen);