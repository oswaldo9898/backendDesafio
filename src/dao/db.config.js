import mongoose from 'mongoose';
import config  from '../config/config.js';

const URI = config.mongoURL;


try {
    await mongoose.connect(URI);
    console.log('Conectado base de datos')
}catch(e) {
    console.log(e);
}
