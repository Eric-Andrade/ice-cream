import Order from '../../models/orders'
import { requireAuth } from '../../services/auth'

export default {
    getOrder: async(_, { _id }, {client}) =>{
         try{
            await requireAuth(client)
             return Order.findById(_id)
         }catch(error){
            throw error;
        }
    },
    getOrders: async(_, args, {client}) => {
        try{
            await requireAuth(client)
             return Order.find({}).sort({ createdAt: -1 })
         }catch(error){
            throw error;
        }
    },
    createOrder: async (_, args, {client}) => {
        try{
            await requireAuth(client)
            return Order.create(args)
        }catch(error){
            throw error;
        }
    },    
    updateOrder: async(_, { _id, ... rest }, {client}) => {
        try{
            await requireAuth(client)
            return Order.findByIdAndUpdate(_id, rest, {new: true})
        }catch(error){
            throw error
        }
    },
    deleteOrder: async(_, { _id }, {client}) => {
        try{
            await requireAuth(client)
            await Order.findByIdAndRemove(_id)
            return{
                message: 'Order deleted success!'
            }
        }catch(error){
            throw error;
        }
    }
}