import { IFoodController } from "../core/controllers/food.interface";
import { Response, Request } from 'express';
import { injectable, inject } from "inversify";
import { GENERIC_ERROR, MISSING_FIELDS, FAILED_CREATE, INVALID_ID, UPDATED_FIELD, DELETED_FIELD, NOT_FOUND } from "../common/config/app.config";
import { IFoodService } from "../core/services/food.interface";
import { TYPES } from "../common/config/types";
import { FoodTypeToString } from "../common/enums/foodtype.enum";

@injectable()
export class FoodController implements IFoodController {
    private static _foodService: IFoodService;

    constructor(@inject(TYPES.FoodService) foodService: IFoodService) {
        FoodController._foodService = foodService;
    }

    async Create(req: Request, res: Response) {
        try {
            const payload = req.body;
            if (!payload.name || !payload.measurement) return res.status(400).send({message: MISSING_FIELDS});

            const food = await FoodController._foodService.create(payload);

            return food ? res.status(200).send({food: food}) : res.status(400).send({message: `Food ${FAILED_CREATE}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message});
        }
    }    
    
    async Update(req: Request, res: Response) {
        try {
            if ( isNaN(Number(req.params.id)) ) return res.status(404).send({message: INVALID_ID});
            
            const payload = req.body;
            if (!payload) return res.status(400).send({message: MISSING_FIELDS});

            const response: any = await FoodController._foodService.update(req.params.id, payload);

            return !response.errors ? res.status(200).send({message: `Food ${UPDATED_FIELD}`}) : res.status(400).send({message: response.errors[0].message});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message});
        }
    }
    
    async Delete(req: Request, res: Response) {
        try {
            if ( isNaN(Number(req.params.id)) ) return res.status(404).send({message: INVALID_ID});
            const response = await FoodController._foodService.delete(req.params.id);

            return response > 0 ? res.status(200).send({message: `Food ${DELETED_FIELD}`}) : res.status(400).send({message: `Food ${NOT_FOUND}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message});
        }
    }
    
    async GetAll(req: Request, res: Response) {
        try {
            const category = FoodTypeToString(req.query.category);
            const foods = await FoodController._foodService.getAll(req.query.limit, req.query.page, category);
            return foods.length > 0 ? res.status(200).send({foods: foods}) : res.status(404).send({message: `Foods ${NOT_FOUND}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message});
        }
    }
    
    async GetById(req: Request, res: Response) {
        try {
            if ( isNaN(Number(req.params.id)) ) return res.status(404).send({message: INVALID_ID});
            const food = await FoodController._foodService.getById(req.params.id);
            return food ? res.status(200).send({food: food}) : res.status(404).send({message: `Food ${NOT_FOUND}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message});
        }
    }
    
}