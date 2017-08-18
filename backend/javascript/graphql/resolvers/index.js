import OrderResolver from './orders.resolver'

export default {
    Query: {
        getOrders: OrderResolver.getOrders
    }
}