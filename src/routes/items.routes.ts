import { Router } from 'express';
import db from '../database/db';

const itemsRouter = Router();

itemsRouter.get('/', async (req, res) => {
    const items = await db('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3000/uploads/${item.image}`
        }
    });

    return res.json(serializedItems);
});

export default itemsRouter;