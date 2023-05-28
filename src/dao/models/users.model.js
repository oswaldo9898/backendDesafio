import mongoose, {Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const usersSchema = new mongoose.Schema({
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

usersSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, usersSchema);

export default userModel;