import { connect, disconnect } from 'mongoose';

export async function connectDb(): Promise<void> {
    await connect(`mongodb://${process.env['DB_USERNAME']}:${process.env['DB_PASSWORD']}@${process.env['DB_HOST']}:${process.env['DB_PORT']}/${process.env['DB_NAME']}`);
}

export async function closeDb(): Promise<void> {
    await disconnect();
}
