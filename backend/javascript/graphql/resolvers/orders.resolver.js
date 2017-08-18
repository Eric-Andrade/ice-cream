import Order from '../../models/orders'

export default {
    getOrders: () => Order.find({})
}