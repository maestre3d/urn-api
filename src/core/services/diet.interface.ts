/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Diet service interface
 */

import IService from "../service";
import { IDiet } from "../../domain/models/diet.model";
import { Request } from "express";
import { IDietUser } from "../../domain/models/dietuser.model";

export interface IDietService extends IService<IDiet> {
    generateUserDiet(Id: any): Promise<any>;
    getUserDiet(Id: any): Promise<IDiet>;
    getAllUserDiets(limit: number, page: number): Promise<IDietUser[]>;
    uploadDietJSON(req: Request): Promise<void>;
}