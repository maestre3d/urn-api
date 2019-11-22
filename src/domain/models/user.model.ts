/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Exports User class / interface model
 */

import { Model, DataTypes } from 'sequelize';
import { PoolInstance } from '../../infrastructure/pool';

export interface IUser {
    id?: number,
    password: string,
    email: string,
    name: string,
    surname: string,
    image?: string | null,
    role?: string,
    domain?: string | null,
    oauth_id?: string | null,
    confirmed?: boolean,
    active?: boolean,
    created_at?: Date,
    updated_at?: Date
}

export class User extends Model implements IUser {
    public id!: number;
    public password!: string;
    public email!: string;
    public name!: string;
    public surname!: string;
    public image?: string | null;
    public role!: string;
    public domain?: string | null;
    public oauth_id?: string | null;
    public confirmed!: boolean;
    public active!: boolean;
    public created_at!: Date;
    public updated_at!: Date;


    public static startModel() {
        this.init({
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            role: {
                type: DataTypes.STRING(50),
                defaultValue: 'ROLE_USER',
                allowNull: false
            },
            domain: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            oauth_id: {
                type: DataTypes.TEXT,
                allowNull: true,
                unique: true
            },
            confirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date()
            }
        }, {
            schema: 'client',
            tableName: 'users',
            timestamps: false,
            sequelize: PoolInstance.getInstance()
        });
    }
}