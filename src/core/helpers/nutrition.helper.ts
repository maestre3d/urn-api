/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Nutritional Operation Interface
 */
import { IUserExtra } from "../../domain/models/userextra.model";

export interface INutritionHelper {
    generateBMI(weight: number, height: number): number;
    generateIBW(height: number): number;
    generateBMR(age: number, gender: string, IBW: number): number;
    generateTEE(activity_type: string, BMR: number): number;
    getBodyType(BMI: number): string;
    generateCalculus(height: number, weight: number, birth: string, gender: string, activity_type: string): IUserExtra;
}