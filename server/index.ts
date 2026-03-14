import express, { Request, Response, Application } from 'express';

const app: Application = express();
const PORT: number = 3001;

app.use(express.json());

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from Node!' });
});

app.listen(PORT, () => {
    console.log('sever running on http://localhost:${PORT}');
});