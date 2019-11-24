/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description IO Local Instance Storage operations interface
 */
import { IStorageHelper } from "../../core/helpers/storage.helper";
import { injectable } from "inversify";

import fs from 'fs';

@injectable()
export default class StorageHelper implements IStorageHelper {

    async createDirectory(filePath: string): Promise<boolean> {
        return new Promise((resolve: any, reject: any) => {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    fs.mkdir(filePath, (err) => {
                        err ? reject(err) : resolve(true);
                    });
                }
                
                resolve(true);
            })

        });
    }

    async renameFile(filePath: string, newFilePath: string): Promise<string> {
        return new Promise((resolve: any, reject: any) => {
            fs.rename(filePath, newFilePath, (err) => {
                err ? reject(err) : resolve(newFilePath);
            });
        });
    }

    async deleteFile(filePath: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            fs.unlink(filePath, (err) => {
                err ? reject(err) : resolve(true);
            });
        });
    }

    async readFile(filePath: string): Promise<Buffer> {
        return new Promise((resolve: any, reject: any) => {
            fs.readFile(filePath, (err, data) => {
                err ? reject(err) : resolve(data);
            })
        });
    }

}