/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Handles all database transactions related to Foods
 */

import { IFoodRepository } from "../../core/repositories/food.interface";
import { IFood, Food } from '../../domain/models/food.model'
import { injectable } from "inversify";
import { Op, literal } from "sequelize";

@injectable()
export class FoodRepository implements IFoodRepository {

    public constructor() {
        Food.startModel();
    }

    Create(model: IFood): Promise<IFood> {
        return Food.create(model)
        .then(food => food).catch(e => e);
    }

    Update(Id: any, payload: any): Promise<void> {
        return Food.update(payload, { where: { id: Id } })
        .then(food => food).catch(e => e);
    }

    Delete(Id: any): Promise<number> {
        return Food.destroy({where: {id: Id}})
        .then(food => food).catch(e => e);
    }

    GetById(Id: any): Promise<IFood | any> {
        return Food.findOne({ raw: true, where: { id: Id } })
        .then(food => food).catch(e => e);
    }

    GetAll(limit: number, page: number): Promise<{rows: IFood[], count: number}> {
        return Food.findAndCountAll({raw: true , limit: limit, offset: page })
        .then(foods => foods).catch(e => e);
    }

    FindOne(args?: any): Promise<IFood> {
        return Food.findOne({ raw: true, where: args })
        .then(food => food).catch(e => e);
    }

    FindMany(limit: number, page: number, args?: any): Promise<IFood[]> {
        return Food.findAll({
            where: {
                id: {
                    [Op.in]: [literal(args)]
                }
            },
            limit: limit, offset: page })
        .then(foods => foods).catch(e => e);
    }
    
}