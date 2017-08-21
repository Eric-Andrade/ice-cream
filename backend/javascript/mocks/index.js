import faker from 'faker'
import Order from '../models/orders'
import Client from '../models/clients'

const ordersTotal = 3;
const clientsTotal = 3;

export default async()=>{
    try{
        await Order.remove()
        await Client.remove()

        await Array.from({length: clientsTotal})
        .forEach(async (_, i) =>{
            const client = await Client.create({
                username: faker.internet.userName(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email(),
                avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
                password: '123'
            });
            await Array.from({length: ordersTotal})
            .forEach(async () =>{
                await Order.create({
                    text: faker.lorem.sentence(),
                    client: client._id
                })
            })
        })

    }catch(error){
        throw error;
    }
}