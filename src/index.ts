import express from 'express';
import actuator from 'express-actuator';
import { connectDb, closeDb } from './database/connection';
import pathwayRouter from './routers/pathway.router';

const app = express();
const port = function (): number {
    const portEnv = process.env['PORT'];
    if (!portEnv) {
        return 3000;
    }
    return parseInt(portEnv);
}();

app.use(actuator({
    basePath: '/actuator'
}));
app.use('/api/paths', pathwayRouter);

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
