import mongoose, {Schema} from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs'

const ClientSchema = new Schema({
    username:{ type: String, 
        unique: true},
    firstname: String,
    lastname: String,
    avatar: String,
    password: String,
    email: String

},{ timestamps: true });

ClientSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = this._hashPassword(this.password);
        return next();
    }
    return next();
})

ClientSchema.methods = {
    _hashPassword(password){
        return hashSync(password)
    },
    authenticateClient(password){
        return compareSync(password, this.password)
    }
}

export default mongoose.model('Client', ClientSchema)
