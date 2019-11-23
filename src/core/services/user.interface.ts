/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Sets user operations
 */

import { IUser } from "../../domain/models/user.model";
import IService from "../service";
import { Request } from "express";
import { IUserExtra } from "../../domain/models/userextra.model";

export default interface IUserService extends IService<IUser> {
    activateAccount(Id: any, payload: any): Promise<IUserExtra | any>;
    updateUserInfo(Id: any, payload: any): Promise<void>;
    getUserInfo(Id: any): Promise<IUserExtra>;
    changePassword(Id: any, payload: any): Promise<IUser>;
    forceChangePassword(Id: any, password: string): Promise<IUser>;
    forceSignIn(user: string): Promise<string>;
    uploadProfilePicture(req: Request): Promise<string>;
}