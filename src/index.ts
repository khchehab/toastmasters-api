import express from 'express';
import { connectDb, closeDb } from './database/connection';
import pathwayRouter from './routers/pathway.router';

const app = express();
const port = 3000;

app.use('/paths', pathwayRouter);

app.listen(port, function () {
    async function connect() {
        await connectDb();
        console.log(`🚀 Server has started on port ${port}`);
    }

    connect();
});

async function stopServer() {
    await closeDb();
    console.log('❎ Server has stopped');
    process.exit(0);
}

process.on('SIGINT', function () {
    stopServer();
});
