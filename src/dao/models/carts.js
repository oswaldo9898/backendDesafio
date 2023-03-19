import mongoose, {Schema} from 'mongoose';

const cartCollections = 'carts';

const cartSchema = new mongoose.Schema({
    products: [{
        product: {type: Schema.ObjectId, ref:'products'},
        quantify:{ type: Number, default: 0}
    }]
});

export const cartModel = mongoose.model(cartCollections, cartSchema);
