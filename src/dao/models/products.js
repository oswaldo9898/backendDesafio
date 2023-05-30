import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollections = 'products';

const productsSchema = new mongoose.Schema({
    title: {
        type:String,
        require: true
    },
    description: {
        type:String,
        require: true
    },
    code: {
        type:String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    portada: {
        type: String,
        require: true,
    },
    thumbnail: {
        type: Array,
        default: []
    },
    owner: {
        type: Schema.Types.String , ref:'users',
    },
    id: Number
});

productsSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollections, productsSchema);
export default productModel;