import * as dotenv from 'dotenv'

//load env when not running in ci
if(!process.env.CI){
    dotenv.config();
}

export const user =process.env.user;
export const pas = process.env.pas;

if(!user || !pas){
    throw new Error("email and pass must be defined in environment vairables")
}