import {Request, Response, text} from 'express';
import knex from '../database/connection';
import routes from '../routes';

class PointsController {
    
    async index(request: Request, response: Response) {  
        //cidade, uf, items  (Query Params)
        const {city, uf, items} = request.query;
        
        
        const parsedItems = String(items)
            .split(',')
            .map(item=> Number(item.trim()));

        const points = await knex('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')        
            
        console.log(city, uf, items, parsedItems);
        console.log(points, 'PONTOS');

        const serializedPoints = points.map((point: any) => {
            return {
               ...points,
                image_url: `http://192.168.0.104:3333/uploads/${point.image}`
            }
        })

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {   
        const { id } = request.params;
        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({message: 'Point not found'});
        }
        
        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.104:3333/uploads/${point.image}`
        }
        
        // SELECT * FROM items
        // JOIN point_items ON items.id = point_items.item_id
        // WHERE point_items.point_id = id

        const items = await knex('items')
        .join('points_items','items.id', '=', 'points_items.item_id')
        .where('points_items.point_id', id)
        .select('items.title');


        
        return response.json({
            serializedPoint, 
            items
        });
    }

    async create(request: Request, response: Response) {        
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        
        const trx = await knex.transaction();
        
        const point = {
            image: request.file?.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf        
        };

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
        .split(',')
        .map((item: string)=> Number(item.trim()))
        .map((item_id: number) => {
            return {
                item_id,
                point_id: point_id,
            }
        });
    
        await trx('points_items').insert(pointItems);
    
        await trx.commit();

        return response.json({
            id: point_id,
            ...point,
        });
    }
}

export default PointsController;