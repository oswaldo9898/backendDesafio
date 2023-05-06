import mongoose, {Schema} from 'mongoose';

const ticketsCollections = 'tickets';

const ticketsSchema = new mongoose.Schema({
    code: {
        type:String,
        unique: true,
        require: true
    },
    products: [{
        product: {type: Schema.ObjectId, ref:'products'},
        quantify:{ type: Number, default: 0}
    }],
    purchase_datetime: {
        type:String,
        require: true
    },
    amount: {
        type:Number,
        require: true
    },
    purchaser: {
        type: String,
        require: true,
    }
}, {
    timestamps: {
        purchase_datetime: 'created_at',
    }
});


const ticketModel = mongoose.model(ticketsCollections, ticketsSchema);
export default ticketModel;