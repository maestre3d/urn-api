/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description HTTP Headers middlewares
 */

import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    res.setHeader('Allow', 'GET, POST, DELETE, PUT, OPTIONS');

    if ('OPTIONS' == req.method) {
    	res.sendStatus(200);
    }
    else {
    	next();
    }
}