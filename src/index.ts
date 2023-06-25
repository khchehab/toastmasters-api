import express from 'express';
import { connectDb, closeDb } from './database/connection';
import apiDocRouter from './routers/api-doc.router';
import actuatorRouter from './routers/actuator.router';
import pathwayRouter from './routers/pathway.router';

const app = express();
const port = function (): number {
    const portEnv = process.env['PORT'];
    if (!portEnv) {
        return 3000;
    }
    return parseInt(portEnv);
}();

app.use('/api-docs', apiDocRouter);
app.use(actuatorRouter);
app.use('/api/v1/paths', pathwayRouter);

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
