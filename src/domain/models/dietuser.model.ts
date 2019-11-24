/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Exports Diet-User class / interface model
 */
import { Model, DataTypes } from "sequelize";
import { PoolInstance } from "../../infrastructure/pool";
import { Diet } from "./diet.model";
import { User } from "./user.model";

export interface IDietUser {
    fk_user: number;
    fk_diet: number;
}

export class DietUser extends Model implements IDietUser {
    fk_user!: number;
    fk_diet!: number;

    public static startModel() {
        this.init({
            fk_user: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: User,
                    key: 'fk_user'
                },
                onDelete: 'CASCADE'
            },
            fk_diet: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: Diet,
                    key: 'fk_diet'
                },
                onDelete: 'CASCADE'
            }
        }, {
            schema: 'client',
            tableName: 'diet_user',
            underscored: true,
            timestamps: false,
            sequelize: PoolInstance.getInstance()
        })
    }
}