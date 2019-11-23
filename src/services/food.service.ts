/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Handles all foods operations
 */

import { IFoodService } from '../core/services/food.interface';
import { IFood } from '../domain/models/food.model';
import { injectable, inject } from 'inversify';
import { IFoodRepository } from '../core/repositories/food.interface';
import { TYPES } from '../common/config/types';

@injectable()
export class FoodService implements IFoodService {
    private _foodRepository: IFoodRepository;

    constructor(@inject(TYPES.FoodRepository) foodRepository: IFoodRepository) {
        this._foodRepository = foodRepository;
    }

    async create(payload: any): Promise<IFood> {
        try {
            const food: IFood = {
                name: payload.name,
                description: payload.description,
                measurement: payload.measurement
            }

            return this._foodRepository.Create(food);
        } catch (error) {
            throw error;
        }
    }    
    
    async update(Id: any, payload: any): Promise<void> {
        try {
            return this._foodRepository.Update(Id, payload);
        } catch (error) {
            throw error;
        }
    }
    
    async delete(Id: any): Promise<number> {
        try {
            return this._foodRepository.Delete(Id);
        } catch (error) {
            throw error;
        }
    }
    
    async getAll(limit: number, page: number, category?: number): Promise<IFood[]> {
        try {
            const currentPage = page && page > 0 ? page - 1 : 0;
            const maxItems = limit && limit > 0 ? limit : 20;
            const offset: number = Number(currentPage) * Number(maxItems);

            if (category) {
                return this._foodRepository.FindMany(maxItems, offset, `(SELECT FK_FOOD FROM CLIENT.FOOD_LIST WHERE FK_CATEGORY = ${category})`);
            } else {
                const users = await this._foodRepository.GetAll(maxItems, offset);
                return users.rows;   
            }
        } catch (error) {
            throw error;
        }
    }
    
    async getById(Id: any): Promise<IFood> {
        try {
            return this._foodRepository.GetById(Id);
        } catch (error) {
            throw error;
        }
    }
    
}