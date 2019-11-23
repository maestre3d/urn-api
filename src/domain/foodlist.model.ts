import { Model, DataTypes } from "sequelize";
import { PoolInstance } from "../infrastructure/pool";
import { Food } from "./models/food.model";
import { FoodCategory } from "./models/foodcategory.model";

export interface IFoodList {
    fk_food: number;
    fk_category: number;
}

export class FoodList extends Model implements IFoodList {
    fk_category!: number;
    fk_food!: number;

    public static startModel() {
        this.init({
            fk_food: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: Food,
                    key: 'fk_food'
                },
                onDelete: 'CASCADE'
            },
            fk_category: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: FoodCategory,
                    key: 'fk_category'
                }
            }
        },{
            schema: 'client',
            tableName: 'food_list',
            underscored: true,
            timestamps: false,
            sequelize: PoolInstance.getInstance()
        })
    }
}