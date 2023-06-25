import express, { Request, Response } from 'express';

const app = express();
const port = 4000;

app.get('/', (_: Request, res: Response) => {
    res.send('Hey this is my API running 🥳');
});

app.get('/about', (_: Request, res: Response) => {
    res.send('This is my about route...');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export default app;
