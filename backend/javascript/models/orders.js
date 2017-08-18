import mongoose, {Schema} from 'mongoose';

const OrderSchema = new Schema({
    text: String
});

export default mongoose.model('Order', OrderSchema)
