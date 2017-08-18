import faker from 'faker'
import Order from '../models/orders'

const orders_total = 10;

export default async()=>{
    try{
        await Order.remove()
        await Array.from({length: orders_total})
            .forEach(async () =>{
                await Order.create({text: faker.lorem.paragraphs(1)})
            })
    }catch(error){
        throw error;
    }
}