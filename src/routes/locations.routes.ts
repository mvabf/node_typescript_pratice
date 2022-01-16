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

    const newIds = await db('locations').insert(location);

    const locationId = newIds[0];

    const locationItems = items.map((item_id: number) => {
        return {
            item_id,
            location_id: locationId
        }
    });

    await db('location_items').insert(locationItems);

    return res.json({
        id: locationId,
        ...location
    });
});

export default locationsRouter;