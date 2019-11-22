/**
 * @name Nebula
 * @version 0.0.1a
 * @copyright Damascus Engineering. 2019 All rights reserved.
 * @license Confidential This file belongs to Damascus Engineering intellectual property,
 * any unauthorized distribution of this file will be punished by law.
 * @author Alonso Ruiz
 * @description Start & configure dependencies
 */

// Required libs
import express from 'express';
import compression  from 'compression';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import * as fs from 'fs';
import * as path from 'path';
import lusca from "lusca";
import passport from "passport";

// Custom libs
import { nebulaContainer } from '../common/config/inversify.config';
import { IPassportConfig } from '../core/config/passport.interface';
import { TYPES } from '../common/config/types';
import ErrorHelper from '../common/helpers/error.helper';
import Headers from '../middlewares/headers.middleware';

// Const
const app = express();

// Routes import
import Routes from '../routes';

// Gzip compression
app.use(compression());

// Parser to JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Config logger
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.default(
    'access.log', {
        interval: '5d',
        path: logDirectory
    }
);
app.use(morgan("combined", { stream: accessLogStream }));

// Passport Auth
app.use(passport.initialize());
const passportConfig: IPassportConfig = nebulaContainer.get<IPassportConfig>(TYPES.PassportConfig);

// LUSCA
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// CORS
// TODO - Change public policy to AWS Cloudfront/VPC
app.use(Headers);

// Routes
app.use(Routes);

// Express-JWT
app.use(ErrorHelper);

export default app;