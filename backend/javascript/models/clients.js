import mongoose, {Schema} from 'mongoose';

const ClientSchema = new Schema({
    username:{ type: String, 
        unique: true},
    firstname: String,
    lastname: String,
    avatar: String,
    password: String,
    email: String

},{ timestamps: true });

export default mongoose.model('Client', ClientSchema)
