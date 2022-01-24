import { response, Router } from 'express';
import db from '../database/db';

const locationsRouter = Router();


locationsRouter.post('/', async(req, res) => {

    const { 
        name, 
        email, 
        whatsapp, 
        latitude, 
        longitude,
        city,
        state,
        items
    } = req.body;

    const location = {
        name,
        image: "fake-image.png",
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        state,
    };

    const transaction = await db.transaction();

    const newIds = await transaction('locations').insert(location);

    const location_id = newIds[0];

    const validItems = await transaction('items').whereIn('id', items);

    if (!(validItems.length == items.length)) 
        return res.status(400).json({error: 'Item não pertece a categoria alguma!'});

    const locationItems = items.map((item_id: number) => {
        return {
            item_id,
            location_id
        }
    });

    await transaction('location_items').insert(locationItems);

    await transaction.commit();

    return res.json({
        id: location_id,
        ...location
    });
});

export default locationsRouter;