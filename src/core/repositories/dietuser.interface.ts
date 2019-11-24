/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Diet repository interface
 */

import { IRepository } from "../repository";
import { IDietUser } from "../../domain/models/dietuser.model";

export interface IDietUserRepository extends IRepository<IDietUser> { }