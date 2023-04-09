import mongoose, {Schema} from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cart: {
        type: Schema.ObjectId, 
        ref:'carts'
    },
    role: {
        type: String,
        default: 'user',
        require: true
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;