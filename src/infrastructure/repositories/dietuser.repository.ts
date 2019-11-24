/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Diet-User Database operations
 */

import { IDietUserRepository } from '../../core/repositories/dietuser.interface';
import { IDietUser, DietUser } from '../../domain/models/dietuser.model';
import { injectable } from 'inversify';

@injectable()
export class DietUserRepository implements IDietUserRepository {

    public constructor() {
        DietUser.startModel();
    }

    Create(model: IDietUser): Promise<IDietUser> {
        return DietUser.create(model)
        .then(diet => diet).catch(e => e);
    }

    Update(Id: any, payload: any): Promise<void> {
        return DietUser.update(payload, { where: { fk_user: Id } })
        .then(diet => diet).catch(e => e);
    }

    Delete(Id: any): Promise<number> {
        return DietUser.destroy({where: {id: Id}})
        .then(diet => diet).catch(e => e);
    }

    GetById(Id: any): Promise<IDietUser | any> {
        return DietUser.findOne({ raw: true, where: { fk_user: Id } })
        .then(diet => diet).catch(e => e);
    }

    GetAll(limit: number, page: number): Promise<{rows: IDietUser[], count: number}> {
        return DietUser.findAndCountAll({raw: true , limit: limit, offset: page })
        .then(diets => diets).catch(e => e);
    }

    FindOne(args?: any): Promise<IDietUser> {
        return DietUser.findOne({ raw: true, where: args })
        .then(diet => diet).catch(e => e);
    }

    FindMany(limit: number, page: number, args?: any): Promise<IDietUser[]> {
        return DietUser.findAll({raw: true, where: args, limit: limit, offset: page, order: [ ['id', 'ASC'] ] })
        .then(diets => diets)
        .catch(e => e);
    }

}