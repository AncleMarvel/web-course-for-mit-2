import dotenv from 'dotenv';
dotenv.config();

export default {
    SHOPIFY_ADMIN_API_KEY: process.env.SHOPIFY_ADMIN_API_KEY,
    PORT: process.env.SERVER_PORT || 3000,
}