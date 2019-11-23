import { Model, DataTypes } from 'sequelize';
import { PoolInstance } from '../../infrastructure/pool';

export interface IFood {
    id?: number,
    name: string,
    description?: string,
    measurement: string
}

export class Food extends Model implements IFood {
    id?: number;
    name!: string;
    description?: string;
    measurement!: string;

    public static startModel() {
        this.init({
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            measurement: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            schema: 'client',
            tableName: 'foods',
            timestamps: false,
            sequelize: PoolInstance.getInstance()
        })
    }
}