/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Root DI Container
 */

import { Container } from 'inversify';
import { TYPES } from './types';

// Interfaces
import IUserService from '../../core/services/user.interface';
import IUserRepository from '../../core/repositories/user.repository';
import IUserController from '../../core/controllers/user.controller';
import { IMailHelper } from '../../core/helpers/mail.interface';
import { IAuthService } from '../../core/services/auth.interface';
import { ITokenRepository } from '../../core/repositories/token.repository';
import { IPassportConfig } from '../../core/config/passport.interface';
import { IStorageHelper } from '../../core/helpers/storage.helper';
import { IS3Helper } from '../../core/helpers/s3.interface';
import { IUserExtraRepository } from '../../core/repositories/userextra.interface';
import { INutritionHelper } from '../../core/helpers/nutrition.helper';
import { IFoodRepository } from '../../core/repositories/food.interface';
import { IFoodService } from '../../core/services/food.interface';
import { IFoodController } from '../../core/controllers/food.interface';
import { IDietController } from '../../core/controllers/diet.interface';
import { IDietService } from '../../core/services/diet.interface';
import { IDietUserRepository } from '../../core/repositories/dietuser.interface';
import { IDietRepository } from '../../core/repositories/diet.interface';


// Implementations
import UserService from '../../services/user.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserController } from '../../controllers/user.controller';
import MailHelper from '../helpers/mail.helper';
import { AuthService } from '../../services/auth.service';
import { TokenRepository } from '../../infrastructure/repositories/token.repository';
import { PassportConfig } from './passport.config';
import StorageHelper from '../helpers/storage.helper';
import S3Helper from '../helpers/s3.helper';
import { UserExtraRepository } from '../../infrastructure/repositories/userextra.repository';
import NutritionHelper from '../helpers/nutrition.helper';

import { FoodRepository } from '../../infrastructure/repositories/food.repository';
import { FoodService } from '../../services/food.service';
import { FoodController } from '../../controllers/food.controller';
import { DietRepository } from '../../infrastructure/repositories/diet.repository';
import { DietUserRepository } from '../../infrastructure/repositories/dietuser.repository';
import { DietService } from '../../services/diet.service';
import { DietController } from '../../controllers/diet.controller';


const nebulaContainer = new Container();
nebulaContainer.bind<IUserController>(TYPES.UserController).to(UserController);
nebulaContainer.bind<IMailHelper>(TYPES.MailHelper).to(MailHelper).inSingletonScope();
nebulaContainer.bind<IPassportConfig>(TYPES.PassportConfig).to(PassportConfig).inSingletonScope();
nebulaContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService);
nebulaContainer.bind<IUserService>(TYPES.UserService).to(UserService);
nebulaContainer.bind<ITokenRepository>(TYPES.TokenReposity).to(TokenRepository);
nebulaContainer.bind<IUserExtraRepository>(TYPES.UserExtraRepository).to(UserExtraRepository);
nebulaContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
nebulaContainer.bind<IStorageHelper>(TYPES.StorageHelper).to(StorageHelper);
nebulaContainer.bind<IS3Helper>(TYPES.S3Helper).to(S3Helper).inSingletonScope();
nebulaContainer.bind<INutritionHelper>(TYPES.NutritionHelper).to(NutritionHelper);

nebulaContainer.bind<IFoodRepository>(TYPES.FoodRepository).to(FoodRepository);
nebulaContainer.bind<IFoodService>(TYPES.FoodService).to(FoodService);
nebulaContainer.bind<IFoodController>(TYPES.FoodController).to(FoodController);

nebulaContainer.bind<IDietRepository>(TYPES.DietRepository).to(DietRepository);
nebulaContainer.bind<IDietUserRepository>(TYPES.DietUserRepository).to(DietUserRepository);
nebulaContainer.bind<IDietService>(TYPES.DietService).to(DietService);
nebulaContainer.bind<IDietController>(TYPES.DietController).to(DietController);

export { nebulaContainer };