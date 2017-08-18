import mongoose, {Schema} from 'mongoose';

const OrderSchema = new Schema({
    text: String
},{ timestamps: true });

export default mongoose.model('Order', OrderSchema)
