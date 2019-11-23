/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Exports food-related endpoints
 */
import { Router } from "express";
import { IFoodController } from "../core/controllers/food.interface";
import { nebulaContainer } from "../common/config/inversify.config";
import { TYPES } from "../common/config/types";

const api = Router();
const controller: IFoodController = nebulaContainer.get<IFoodController>(TYPES.FoodController)

api.route('/food')
.post(controller.Create)
.get(controller.GetAll);

api.route('/food/:id')
.get(controller.GetById)
.put(controller.Update)
.delete(controller.Delete);

export default api;