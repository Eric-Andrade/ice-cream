import faker from 'faker'
import Order from '../models/orders'
import Client from '../models/clients'

const ordersTotal = 10;

export default async()=>{
    try{
        await Order.remove()
        await Client.remove()

        await Array.from({length: ordersTotal})
            .forEach(async () =>{
                await Order.create({text: faker.lorem.paragraphs(1)})
            })
    }catch(error){
        throw error;
    }
}