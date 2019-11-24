/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Exports Diet class / interface model
 */

import { Model, DataTypes } from "sequelize";
import { PoolInstance } from "../../infrastructure/pool";

export interface IDiet {
    id?: number;
    total_calories: number;
    json_url?: string;
    created_at?: Date;
}

export class Diet extends Model implements IDiet {
    id?: number;
    total_calories!: number;
    json_url?: string;
    created_at?: Date;

    public static startModel() {
        this.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            total_calories: {
                type: DataTypes.SMALLINT,
                allowNull: false
            },
            json_url: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: null
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: new Date()
            }
        }, {
            schema: 'client',
            tableName: 'diet',
            timestamps: false,
            sequelize: PoolInstance.getInstance()
        })
    }
}