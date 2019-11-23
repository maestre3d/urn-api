/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Handles all database transactions related to UserExtra
 */

import { injectable } from "inversify";
import { IUserExtraRepository } from "../../core/repositories/userextra.interface";
import { IUserExtra, UserExtra } from "../../domain/models/userextra.model";

@injectable()
export class UserExtraRepository implements IUserExtraRepository {

    constructor() {}

    Create(model: IUserExtra): Promise<IUserExtra> {
        UserExtra.startModel();
        return UserExtra.create(model)
        .then(user => user).catch(e => e);
    }

    Update(Id: any, payload: any): Promise<void> {
        UserExtra.startModel();
        return UserExtra.update(payload, { where: { id: Id } })
        .then(user => user).catch(e => e);
    }

    Delete(Id: any): Promise<number> {
        UserExtra.startModel();
        return UserExtra.destroy({where: {id: Id}})
        .then(user => user).catch(e => e);
    }

    GetById(Id: any): Promise<IUserExtra> {
        UserExtra.startModel();
        return UserExtra.findOne({ where: { id: Id } })
        .then(user => user).catch(e => e);
    }

    GetAll(limit: number, page: number): Promise<{rows: IUserExtra[], count: number}> {
        UserExtra.startModel();
        return UserExtra.findAndCountAll({ limit: limit, offset: page })
        .then(users => users).catch(e => e);
    }

    FindOne(args?: any): Promise<IUserExtra> {
        UserExtra.startModel();
        return UserExtra.findOne({where: args })
        .then(user => user).catch(e => e);
    }

    FindMany(limit: number, page: number, args?: any): Promise<IUserExtra[]> {
        UserExtra.startModel();

        return UserExtra.findAll({ where: args, limit: limit, offset: page })
        .then(users => users).catch(e => e);
    }
}