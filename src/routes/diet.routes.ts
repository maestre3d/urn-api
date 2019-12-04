import { Router } from "express";
import { IDietController } from "../core/controllers/diet.interface";
import { TYPES } from "../common/config/types";
import { nebulaContainer } from "../common/config/inversify.config";

import isAuth from '../middlewares/auth.middleware';

const api = Router();

const controller: IDietController = nebulaContainer.get(TYPES.DietController);

api.route('/diet')
.get(controller.GetAll)
.post(controller.Create);

api.route('/diet/:id')
.get(controller.GetById)
.put(controller.Update)
.delete(controller.Delete);

api.route('/diets')
.get(controller.GetAllUserDiets);

api.route('/diet/upload/:id')
.put(controller.UploadDietJSON)

api.route('/account/diet')
.put(isAuth, controller.GenerateUserDiet)
.get(isAuth, controller.GetUserDiet);

export default api;