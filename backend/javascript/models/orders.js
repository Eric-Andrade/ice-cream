import mongoose, {Schema} from 'mongoose';

const OrderSchema = new Schema({
    text:{
        type: String,
        minlength:[5,'Text must to be longer'],
        maxlength:[150,'Text too long']
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    favoriteCount:{
        type: Number,
        default: 0
    }
},{ timestamps: true });

export default mongoose.model('Order', OrderSchema)
