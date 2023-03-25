import * as dotenv from 'dotenv';
dotenv.config()

export const PORT = process.env.PORT || "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || "";
export const MAILGUN_EMAIL_DOMAIN = process.env.MAILGUN_EMAIL_DOMAIN || "";
