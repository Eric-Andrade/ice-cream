import GraphQLDate from 'graphql-date'
import OrdersResolver from './orders.resolver'
import ClientsResolver from './clients.resolver'
import Client from '../../models/clients'

export default {
    Date: GraphQLDate,
    Order:{
        client:({client}) => Client.findById(client)

    },
    Query: {
        getOrder: OrdersResolver.getOrder,
        getOrders: OrdersResolver.getOrders,
        getClientOrders: OrdersResolver.getClientOrders,
        me: ClientsResolver.me
    },
    Mutation: {
        createOrder: OrdersResolver.createOrder,
        updateOrder: OrdersResolver.updateOrder,
        deleteOrder: OrdersResolver.deleteOrder,
        signupClient: ClientsResolver.signupClient,
        loginClient: ClientsResolver.loginClient,
    },
    Subscription: {
        orderAdded: OrdersResolver.orderAdded,
    }
}