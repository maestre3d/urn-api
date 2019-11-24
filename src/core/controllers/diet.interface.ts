/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Diet controller interface
 */


import IController from "../controller";
import { Request, Response } from "express";

export interface IDietController extends IController {
    GenerateUserDiet(req: Request, res: Response): any;
    GetUserDiet(req: Request, res: Response): any;
    GetAllUserDiets(req: Request, res: Response): any;
    UploadDietJSON(req: Request, res: Response): any;
}