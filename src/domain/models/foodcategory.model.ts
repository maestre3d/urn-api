import { Model, DataTypes } from "sequelize";
import { PoolInstance } from "../../infrastructure/pool";

export interface IFoodCategory {
    id?: number,
    name: string,
    description?: string
}

export class FoodCategory extends Model implements IFoodCategory {
    id?: number;
    name!: string;
    description?: string;

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
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            }
        }, {
            schema: 'client',
            tableName: 'food_category',
            underscored: true,
            timestamps: false,
            sequelize: PoolInstance.getInstance()
        })
    }
}