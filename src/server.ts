import express from 'express';
import path from 'path';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(routes);


app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
});