/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Diet Database operations
 */

import { IDietRepository } from "../../core/repositories/diet.interface";
import { IDiet, Diet } from "../../domain/models/diet.model";
import { injectable } from "inversify";
import { Op } from "sequelize";

@injectable()
export class DietRepository implements IDietRepository {

    public constructor() {
        Diet.startModel();
    }

    Create(model: IDiet): Promise<IDiet> {
        return Diet.create(model)
        .then(diet => diet).catch(e => e);
    }

    Update(Id: any, payload: any): Promise<void> {
        return Diet.update(payload, { where: { id: Id } })
        .then(diet => diet).catch(e => e);
    }

    Delete(Id: any): Promise<number> {
        return Diet.destroy({where: {id: Id}})
        .then(diet => diet).catch(e => e);
    }

    GetById(Id: any): Promise<IDiet | any> {
        return Diet.findOne({ raw: true, where: { id: Id } })
        .then(diet => diet).catch(e => e);
    }

    GetAll(limit: number, page: number): Promise<{rows: IDiet[], count: number}> {
        return Diet.findAndCountAll({raw: true , limit: limit, offset: page })
        .then(diets => diets).catch(e => e);
    }

    FindOne(args?: any): Promise<IDiet> {
        return Diet.findOne({ where: {
            total_calories: {
                [Op.gte]: args
            }
        },
        order: [['total_calories', 'ASC']]
        })
        .then(diet => diet).catch(e => e);
    }

    FindMany(limit: number, page: number, args?: any): Promise<IDiet[]> {
        return Diet.findAll({raw: true, where: args, limit: limit, offset: page, order: [ ['id', 'ASC'] ] })
        .then(diets => diets)
        .catch(e => e);
    }    
}