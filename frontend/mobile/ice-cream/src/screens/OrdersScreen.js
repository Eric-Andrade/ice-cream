import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';

import OrderCard from '../components/OrderCard/OrderCard';
import getOrdersQuery from '../graphql/queries/getOrders'
import meQuery from '../graphql/queries/me';
import { getMe }from '../actions/client';
import orderAddedSubscription from '../graphql/subscriptions/orderAdded';

const Root = styled.View`
    flex:1;
    `;


class OrdersScreen extends Component{
    componentWillMount(){
        this.props.data.subscribeToMore({
            document: orderAddedSubscription,
            updateQuery: (prev, {subscriptionData}) =>{
                if(!subscriptionData.data){
                    return prev;
                }
                const newOrder = subscriptionData.data.orderAdded;
                if (!prev.getOrders.find(t => t._id === newOrder._id)) {
                    return {
                        ...prev,
                        getOrders:[{...newOrder}, ...prev.getOrders]
                    }
                }
                return prev;
            }
        })
    }
    componentDidMount(){
        this._getMe();
    }

    _getMe = async () =>{
        const { data: { me } } = await this.props.client.query({query: meQuery});
        this.props.getMe(me)
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

export default withApollo(compose(
        connect(undefined, { getMe }),
        graphql(getOrdersQuery)
        )(OrdersScreen));