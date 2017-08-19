import GraphQLDate from 'graphql-date'
import OrdersResolver from './orders.resolver'
import ClientsResolver from './clients.resolver'

export default {
    Date: GraphQLDate,
    Query: {
        getOrder: OrdersResolver.getOrder,
        getOrders: OrdersResolver.getOrders,
        me: ClientsResolver.me
    },
    Mutation:{
        createOrder: OrdersResolver.createOrder,
        updateOrder: OrdersResolver.updateOrder,
        deleteOrder: OrdersResolver.deleteOrder,
        signupClient: ClientsResolver.signupClient,
        loginClient: ClientsResolver.loginClient,
    }
}