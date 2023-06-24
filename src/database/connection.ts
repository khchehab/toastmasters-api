import { connect, disconnect } from 'mongoose';

export async function connectDb(): Promise<void> {
    await connect('mongodb://mongo-tm:mongo-tm@127.0.0.1:27017/toastmasters');
}

export async function closeDb(): Promise<void> {
    await disconnect();
}
