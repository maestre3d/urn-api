/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Sets food operations
 */

import IService from "../service";
import { IFood } from "../../domain/models/food.model";

export interface IFoodService extends IService<IFood> { 
    getAll(limit: number, page: number, category?: number): Promise<IFood[]>;
}