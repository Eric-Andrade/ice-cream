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
           // await requireAuth(client)
             return Order.find({}).sort({ createdAt: -1 })
         }catch(error){
            throw error;
        }
    },
    getClientOrders: async(_, args, {client}) => {
        try{
            await requireAuth(client)
             return Order.find({client: client._id}).sort({ createdAt: -1 })
         }catch(error){
            throw error;
        }
    },
    createOrder: async (_, args, {client}) => {
        try{
            await requireAuth(client)
            return Order.create({...args,  client: client._id})
        }catch(error){
            throw error;
        }
    },    
    updateOrder: async(_, { _id, ... rest }, {client}) => {
        try{
            await requireAuth(client)
            const order = await Order.findOne({ _id, client: client._id})
            if(!order){
                throw new Error('Order not found')
            }
        Object.entries(rest).forEach(([key, value]) =>{
            order[key] = value;
        });
        return order.save();
        }catch(error){
            throw error
        }
    },
    deleteOrder: async(_, { _id }, {client}) => {
        try{
            await requireAuth(client)
            const order = await Order.findOne({_id, client: client._id})
            if(!order){
                throw new Error('Order not found')
            }
            await order.remove();
            return{
                message: 'Order deleted success!'
            }
        }catch(error){
            throw error;
        }
    }
}