import { IDietService } from "../core/services/diet.interface";
import { IDiet } from '../domain/models/diet.model'
import { injectable, inject, id } from "inversify";
import { IDietRepository } from "../core/repositories/diet.interface";
import { TYPES } from "../common/config/types";
import { Request } from "express";
import { IncomingForm, File } from "formidable";

import rootpath from 'app-root-path';
import { ContentLocationEnum } from "../common/enums/contentlocation.enum";
import { IStorageHelper } from "../core/helpers/storage.helper";
import { extname } from "path";
import { FILE_INVALID_EXTENSION, NOT_FOUND } from "../common/config/app.config";
import { IDietUser } from "../domain/models/dietuser.model";
import { IDietUserRepository } from "../core/repositories/dietuser.interface";
import { IUserExtraRepository } from "../core/repositories/userextra.interface";

@injectable()
export class DietService implements IDietService {
    private _dietRepository: IDietRepository;
    private _storageHelper: IStorageHelper;
    private _dietUserRepository: IDietUserRepository;
    private _userInfoRepository: IUserExtraRepository;

    public constructor(@inject(TYPES.DietRepository) dietRepository: IDietRepository, @inject(TYPES.StorageHelper) storageHelper: IStorageHelper,
                        @inject(TYPES.DietUserRepository) dietUserRepository: IDietUserRepository, @inject(TYPES.UserExtraRepository) userInfoRepo: IUserExtraRepository ) {
        this._dietRepository = dietRepository;
        this._storageHelper = storageHelper;
        this._dietUserRepository = dietUserRepository;
        this._userInfoRepository = userInfoRepo;
    }

    async create(payload: any): Promise<IDiet> {
        try {
            const diet: IDiet = {
                total_calories: payload.calories
            }

            return this._dietRepository.Create(diet);
        } catch (error) {
            throw error;
        }
    }   
    
    async update(Id: any, payload: any): Promise<void> {
        try {
            return this._dietRepository.Update(Id, payload);
        } catch (error) {
            throw error;
        }
    }
    
    async delete(Id: any): Promise<number> {
        try {
            return this._dietRepository.Delete(Id);
        } catch (error) {
            throw error;
        }
    }
    
    async getAll(limit: number, page: number): Promise<IDiet[]> {
        try {
            const currentPage = page && page > 0 ? page - 1 : 0;
            const maxItems = limit && limit > 0 ? limit : 20;
            const offset: number = Number(currentPage) * Number(maxItems);

            const diets = await this._dietRepository.GetAll(maxItems, offset);
            return diets.rows;

        } catch (error) {
            throw error;
        }
    }
    
    async getById(Id: any): Promise<IDiet> {
        try {
            return this._dietRepository.GetById(Id);
        } catch (error) {
            throw error;
        }
    }

    async generateUserDiet(Id: any): Promise<any> {
        try {
            // Search for the best diet
            const userInfo = await this._userInfoRepository.GetById(Id);

            if (!userInfo) throw new Error('User is not activated');

            // Avoid numbers below 1300 cal and 3000 cal
            userInfo.tee = (userInfo.tee != null && userInfo.tee > 3000) ? 3000 : (userInfo.tee != null && userInfo.tee < 1300) ? 1300 : userInfo.tee; 

            const diet = await this._dietRepository.FindOne(userInfo.tee);

            if (!diet || diet == null) throw new Error(`Diet ${NOT_FOUND}`);
  
            // If user has an existing diet, then generate and update with newer one
            const dietUser = await this._dietUserRepository.GetById(Id);
            
            if (dietUser) {
                return this._dietUserRepository.Update(Id, { fk_diet: diet.id });
            } else {
                const newDiet: IDietUser = {
                    fk_user: Id,
                    fk_diet: diet.id || 0
                }
                console.log(newDiet);
                return this._dietUserRepository.Create(newDiet);
            }

        } catch (error) {
            throw error;
        }
    }

    async getUserDiet(Id: any): Promise<IDiet> {
        try {
            const userDiet = await this._dietUserRepository.GetById(Id);
            return  this._dietRepository.GetById(userDiet.fk_diet);

        } catch (error) {
            throw error;
        }
    }

    async getAllUserDiets(limit: number, page: number): Promise<IDietUser[]> {
        try {
            const currentPage = page && page > 0 ? page - 1 : 0;
            const maxItems = limit && limit > 0 ? limit : 20;
            const offset: number = Number(currentPage) * Number(maxItems);

            const users = await this._dietUserRepository.GetAll(maxItems, offset);
            return users.rows;

        } catch (error) {
            throw error;
        }
    }

    async uploadDietJSON(req: Request): Promise<void> {
        try {
            // Formidable
            const form = new IncomingForm();

            // File size
            const mbToBytes: number = 1024 * 1024;
            const maxFileSize: number = 10 * mbToBytes;
            form.maxFieldsSize = maxFileSize;

            // Init folder
            const uploadDir = `${rootpath.path}/uploads/${ContentLocationEnum.DIET}`;
            const createFolder = await this._storageHelper.createDirectory(`${rootpath}/uploads/${ContentLocationEnum.DIET}`);
    
            form.parse(req);
            const extensions: Array<string> = ['.json'];
            
            const localFile: File = await new Promise( (resolve: any, reject: any) => {

                try {
                    form.on('fileBegin', (name, file: File) => {
                        const extension = extname(file.name).toLowerCase();
                        if (extensions.indexOf(extension) == -1) return form.emit('error', (FILE_INVALID_EXTENSION));
                        
                        file.path = `${uploadDir}/${file.name}`;
                    });
    
                    form.on('file', (name, file: File) => {
                        resolve(file);
                    });

                    form.on('error', (message: string) => {
                        reject(new Error(message));
                    });
                } catch (error) {
                    reject(error);
                }
            });

            const jsonFile = await this._storageHelper.readFile(localFile.path);

            const updateDiet = await this._dietRepository.Update(req.params.id, { json_url: JSON.parse(jsonFile.toString()) })
            this._storageHelper.deleteFile(`${uploadDir}/${localFile.name}`);
            
        } catch (error) {
            throw error;
        }
    }

    
}