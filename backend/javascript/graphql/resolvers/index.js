import GraphQLDate from 'graphql-date'
import OrderResolver from './orders.resolver'

export default {
    Date: GraphQLDate,
    Query: {
        getOrder: OrderResolver.getOrder,
        getOrders: OrderResolver.getOrders
    },
    Mutation:{
        createOrder: OrderResolver.createOrder,
        updateOrder: OrderResolver.updateOrder,
        deleteOrder: OrderResolver.deleteOrder,
    }
}