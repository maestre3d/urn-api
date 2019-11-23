/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Nutritional operations helper
 */

import { BodyTypeEnum } from "../enums/bodytype.enum";
import { injectable } from "inversify";
import { GenderEnum } from "../enums/gender.enum";
import { ActivityTypeEnum } from "../enums/activitytype.enum";
import { INutritionHelper } from "../../core/helpers/nutrition.helper";
import { IUserExtra } from "../../domain/models/userextra.model";
import { DietTypeEnum } from "../enums/diettype.enum";

@injectable()
export default class NutritionHelper implements INutritionHelper {

    // IMC
    /**
     * Generates the Body Mass Index
     * @param weight User body weight
     * @param height User body height
     */
    generateBMI(weight: number, height: number): number {
        return weight / Math.pow((height/100), 2);
    }

    // PI
    /**
     * Generates the Ideal Body Weight
     * @param weight User body height
     */
    generateIBW(height: number): number {
        return ((height-152.4)*0.91) + 50;
    }

    // TMB
    /**
     * Generates the Basal Mass Rate
     * @param age User age
     * @param gender User gender *Use enum
     * @param IBW User Ideal Body Weight
     */
    generateBMR(age: number, gender: string, IBW: number): number {
        // Male
        if ( age >= 10 && age <= 18 && gender == GenderEnum.Male ) return (17.5*IBW) + 651;
        else if ( age >= 19 && age <= 30 && gender == GenderEnum.Male ) return (15.3*IBW) + 679;
        else if ( age >= 31 && age <= 60 && gender == GenderEnum.Male ) return (11.6*IBW) + 879;
        else if ( age > 60 && gender == GenderEnum.Male ) return (13.5*IBW) + 487;
        // Female
        else if ( age >= 10 && age <= 18 && gender == GenderEnum.Female ) return (12.2*IBW) + 746;
        else if ( age >= 19 && age <= 30 && gender == GenderEnum.Female ) return (14.7*IBW) + 496;
        else if ( age >= 31 && age <= 60 && gender == GenderEnum.Female ) return (8.7*IBW) + 829;
        else if ( age > 60 && gender == GenderEnum.Female ) return (10.5*IBW) + 596;

        return 0;
    }

    // GET
    /**
     * Generates the Total Energy Expenditure
     * @param activity_type User activity type *Use enum
     * @param BMR User Basal Mass Rate
     */
    generateTEE(activity_type: string, BMR: number): number {
        // Physical Activity factor
        let FAF = 0;
        if (activity_type == ActivityTypeEnum.None) FAF = 1.2;
        else if ( activity_type == ActivityTypeEnum.Barely ) FAF = 1.375;
        else if ( activity_type == ActivityTypeEnum.Average ) FAF = 1.55;
        else if ( activity_type == ActivityTypeEnum.Active ) FAF = 1.725;
        else if ( activity_type == ActivityTypeEnum.Very ) FAF = 1.9;

        return (BMR*FAF)+.1;
    }

    /**
     * Returns User body type
     * @param BMI User Body Mass Index
     */
    getBodyType(BMI: number): string {
        if ( BMI <= 23 ) return BodyTypeEnum.Skinny;
        else if ( BMI >= 23.1 && BMI <= 27.9 ) return BodyTypeEnum.Normal;
        else if ( BMI >= 28 && BMI <= 31.9 ) return BodyTypeEnum.Overweight;
        
        return BodyTypeEnum.Obese;
    }

    generateCalculus(height: number, weight: number, birth: string, gender: string, activity_type: string): IUserExtra {
        // Height in meters, converting it into cm
        height *= 100;
        // Convert to number
        weight *= 1;
        const IBW = this.generateIBW(height);
        const age = this.getAge(birth);

        const userInfo: IUserExtra = {
            weight: weight,
            height: height,
            gender: gender,
            bmi: this.generateBMI(weight, height),
            ibw: IBW,
            bmr: this.generateBMR(age, gender, IBW),
            birth: new Date(birth),
            activity_type: activity_type,
            body_type: BodyTypeEnum.Normal,
            diet_type: DietTypeEnum.Regular
        };

        userInfo.tee = this.generateTEE(activity_type, userInfo.bmr || 0);
        userInfo.body_type = this.getBodyType(userInfo.bmi);

        return userInfo;
    }

    private getAge(dateString: string) 
    {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }
}