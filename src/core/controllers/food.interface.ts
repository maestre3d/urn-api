/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Food controller interface
 */

import IController from "../controller";
import { Response, Request } from "express";

export interface IFoodController extends IController {
    GetByCategory(req: Request, res: Response): any;
}