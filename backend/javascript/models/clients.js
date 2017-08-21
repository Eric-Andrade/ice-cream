import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import constants from '../config/constants'

const ClientSchema = new Schema({
    username:{ 
        type: String, 
        required: true,
        unique: true,
        minlength:[3,'Username must be longer that 3 characters'],
    },
    firstname:{type:String,
        required:true, 
        maxlength:[15,'Firstname need to be longer']
    },
    lastname: String,
    avatar: String,
    password:{
        type:String,
        required:'Password is required',
        minlength:[3, 'Password must be longer that 3 characters'],
    },
    email:{
        type:String,
        required:'Email is required',
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'The email is incorrect type of email']
    },

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
    },
    createToken(){
        return jwt.sign({
            _id: this._id
        },constants.jwt_secret
    )}
}

export default mongoose.model('Client', ClientSchema)
