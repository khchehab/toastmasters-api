import { connect, disconnect } from 'mongoose';

export async function connectDb(): Promise<void> {
    let mongoUri = process.env['MONGODB_URI'];
    if (!mongoUri) {
        mongoUri = `mongodb+srv://${process.env['DB_USERNAME']}:${process.env['DB_PASSWORD']}@${process.env['DB_HOST']}/${process.env['DB_NAME']}`;
    }
    await connect(mongoUri, {
        retryWrites: true,
        w: 'majority'
    });
}

export async function closeDb(): Promise<void> {
    await disconnect();
}
