import { IDietController } from "../core/controllers/diet.interface";
import { Request, Response } from 'express';
import { injectable, inject } from "inversify";
import { TYPES } from "../common/config/types";
import { IDietService } from "../core/services/diet.interface";
import { GENERIC_ERROR, MISSING_FIELDS, FAILED_CREATE, INVALID_ID, UPDATED_FIELD, DELETED_FIELD, NOT_FOUND } from "../common/config/app.config";

@injectable()
export class DietController implements IDietController {

    private static _dietService: IDietService;

    public constructor(@inject(TYPES.DietService) dietService: IDietService) {
        DietController._dietService = dietService;
    }

    async Create(req: Request, res: Response) {
        try {
            const payload = req.body;
            if (!payload.calories) return res.status(400).send({message: MISSING_FIELDS});

            const diet: any = await DietController._dietService.create(payload);
            return diet || diet.errors.length > 0 ? res.status(200).send({diet: diet}) : res.status(404).send({message: `Diet ${FAILED_CREATE}`}); 
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message})
        }
    }   
    
    async Update(req: Request, res: Response) {
        try {
            if ( isNaN(Number(req.params.id)) ) return res.status(404).send({message: INVALID_ID});
            const payload = req.body;
            if (!payload) return res.status(400).send({message: MISSING_FIELDS});

            const response: any = await DietController._dietService.update(req.params.id, payload);

            return !response.errors ? res.status(200).send({message: `Diet ${UPDATED_FIELD}`}) : res.status(400).send({message: response.errors[0].message});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message})
        }
    }
    
    async Delete(req: Request, res: Response) {
        try {
            if ( isNaN(Number(req.params.id)) ) return res.status(404).send({message: INVALID_ID});

            const response = await DietController._dietService.delete(req.params.id);

            return response > 0 ? res.status(200).send({message: `Diet ${DELETED_FIELD}`}) : res.status(400).send({message: `Diet ${NOT_FOUND}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message})
        }
    }
    
    async GetAll(req: Request, res: Response) {
        try {
            const diets = await DietController._dietService.getAll(req.query.limit, req.query.page);
            diets.length > 0 ? res.status(200).send({diets: diets}) : res.status(404).send({message: `Diets ${NOT_FOUND}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message})
        }
    }
    
    async GetById(req: Request, res: Response) {
        try {
            if ( isNaN(Number(req.params.id)) ) return res.status(404).send({message: INVALID_ID});
            const diet = await DietController._dietService.getById(req.params.id);
            diet ? res.status(200).send({diet: diet}) : res.status(404).send({message: `Diet ${NOT_FOUND}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message})
        }
    }

    async GenerateUserDiet(req: Request, res: Response) {
        try {
            const dietUser = await DietController._dietService.generateUserDiet(req.user.id);
            dietUser ? res.status(200).send({message: 'User diet generated'}) : res.status(404).send({message: 'User diet not generated'});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message})
        }
    }

    async GetUserDiet(req: Request, res: Response) {
        try {
            const diet = await DietController._dietService.getUserDiet(req.user.id);
            diet ? res.status(200).send({diet: diet}) : res.status(404).send({message: `User diet  ${NOT_FOUND}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message})
        }
    }

    async GetAllUserDiets(req: Request, res: Response) {
        try {
            const diets = await DietController._dietService.getAllUserDiets(req.query.limit, req.query.page);
            diets.length > 0 ? res.status(200).send({diets: diets}) : res.status(404).send({message: `Diets ${NOT_FOUND}`});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message})
        }
    }

    // Formidable
    async UploadDietJSON(req: Request, res: Response) {
        try {
            if ( isNaN(Number(req.params.id)) ) return res.status(404).send({message: INVALID_ID});
            const uploaded = await DietController._dietService.uploadDietJSON(req);
            res.status(200).send({message: 'Diet uploaded'});
        } catch (error) {
            res.status(500).send({message: GENERIC_ERROR, error: error.message});
        }
    }
    
}