import { Model, DataTypes } from 'sequelize';
import { PoolInstance } from "../../infrastructure/pool";
import { GenderEnum } from "../../common/enums/gender.enum";
import { ActivityTypeEnum } from "../../common/enums/activitytype.enum";
import { BodyTypeEnum } from "../../common/enums/bodytype.enum";
import { DietTypeEnum } from "../../common/enums/diettype.enum";
import { User } from "./user.model";

export interface IUserExtra {
    id?: number,
    bmi: number,
    bmr?: number | null,
    tee?: number | null,
    ibw?: number | null,
    weight: number,
    height: number,
    gender: string,
    birth?: Date,
    activity_type: string,
    body_type: string,
    diet_type?: string,
}

export class UserExtra extends Model implements IUserExtra {
    public id!: number;
    public bmi!: number;
    public bmr?: number | null;
    public tee?: number | null;
    public ibw?: number | null;
    public weight!: number;
    public height!: number;
    public gender!: string;
    public birth?: Date;
    public activity_type!: string;
    public body_type!: string;
    public diet_type?: string;

    public static startModel() {
        this.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: User,
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            bmi: {
                type: DataTypes.FLOAT(5),
                allowNull: false
            },
            bmr: {
                type: DataTypes.FLOAT(5),
                allowNull: true,
                defaultValue: 0.0
            },
            tee: {
                type: DataTypes.FLOAT(5),
                allowNull: true,
                defaultValue: 0.0
            },
            ibw: {
                type: DataTypes.FLOAT(5),
                allowNull: true,
                defaultValue: 0.0
            },
            weight: {
                type: DataTypes.FLOAT(5),
                allowNull: false
            },
            height: {
                type: DataTypes.FLOAT(5),
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: GenderEnum.Male
            },
            birth: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            activity_type: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ActivityTypeEnum.None
            },
            body_type: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: BodyTypeEnum.Normal
            },
            diet_type: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: DietTypeEnum.Regular
            }
        }, {
            schema: 'client',
            tableName: 'user_info',
            timestamps: false,
            underscored: true,
            sequelize: PoolInstance.getInstance()
        })
    }

}