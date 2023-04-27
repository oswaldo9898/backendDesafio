import dotenv from 'dotenv';

dotenv.config();

export default {
    mongoURL: process.env.MONGO_URL,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
    clientId: process.env.CLIENT_ID,
    privateKey: process.env.PRIVATE_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
}