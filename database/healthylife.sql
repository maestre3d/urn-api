/******************************
**	File:	healthylife.sql
**	Name:	HealthyLife
**	Desc:	HealthyLife SQL script
**	Auth:	Damascus Mexico Group
**	Date:	2019
**	Lisc:	AGPLv3
**	Copy:	Damascus Mexico Group. 2019 All rights reserved.
**************************
** Change History
**************************
** PR   Date        Author  		Description 
** --   --------   -------   		------------------------------------
** 1    11/21/2019      Alonso R      Initial setup
*******************************/
 
-- Create schemas
CREATE SCHEMA IF NOT EXISTS client;

-- User table
CREATE TABLE client.users (
	ID          BIGSERIAL PRIMARY KEY NOT NULL,
	PASSWORD    VARCHAR(255) NOT NULL,
	EMAIL       VARCHAR(255) NOT NULL UNIQUE,
	NAME        VARCHAR(100) NOT NULL,
	SURNAME     VARCHAR(100) NOT NULL,
	IMAGE       TEXT,
	ROLE        VARCHAR(50) NOT NULL,
	DOMAIN      VARCHAR(255) DEFAULT NULL,
	OAUTH_ID    TEXT DEFAULT NULL UNIQUE,
	CONFIRMED   BOOL,
	ACTIVE      BOOL DEFAULT FALSE,
	CREATED_AT  DATE NOT NULL DEFAULT CURRENT_DATE,
	UPDATED_AT  DATE NOT NULL DEFAULT CURRENT_DATE
);

-- User's extra info
-- Create required enums
CREATE TYPE enum_Sex AS ENUM('Female', 'Male');
CREATE TYPE enum_ActivityType AS ENUM('None', 'Barely', 'Average', 'Very');
CREATE TYPE enum_BodyType AS ENUM('Obese', 'Overweight', 'Normal', 'Skinny');
CREATE TYPE enum_DietType AS ENUM('Strict', 'Regular', 'Permissive');

CREATE TABLE client.user_info (
    FK_USER BIGSERIAL PRIMARY KEY REFERENCES CLIENT.USERS(ID) ON DELETE CASCADE,
    BMI     FLOAT(5) NOT NULL,
    BMR     FLOAT(5) DEFAULT NULL,
    TEE     FLOAT(5) DEFAULT NULL,
    IBW      FLOAT(5) DEFAULT NULL,
    WEIGHT  FLOAT(5) NOT NULL,
    HEIGHT  FLOAT(5) NOT NULL,
    SEX     enum_Sex DEFAULT 'Male',
    BIRTH   DATE NOT NULL DEFAULT CURRENT_DATE,
    ACTIVITY_TYPE enum_ActivityType NOT NULL DEFAULT 'None',
    BODY_TYPE enum_BodyType NOT NULL DEFAULT 'Normal',
    DIET_TYPE enum_DietType NOT NULL DEFAULT 'Regular'
);

-- Token table
CREATE TABLE client.token (
	ID BIGSERIAL PRIMARY KEY NOT NULL,
	KIND VARCHAR(255) NOT NULL,
	ACCESS_TOKEN TEXT NOT NULL,
	REFRESH_TOKEN TEXT DEFAULT NULL,
	FK_USER BIGSERIAL NOT NULL REFERENCES CLIENT.USERS(ID) ON DELETE CASCADE,
	CREATED_AT DATE NOT NULL DEFAULT CURRENT_DATE,
	UPDATED_AT DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Food table
CREATE TABLE client.foods (
    ID BIGSERIAL PRIMARY KEY NOT NULL,
    NAME VARCHAR(255) NOT NULL,
    DESCRIPTION TEXT DEFAULT NULL,
    MEASUREMENT VARCHAR(100) NOT NULL
);

-- Food category table
CREATE TABLE client.food_category (
    FK_FOOD BIGSERIAL PRIMARY KEY NOT NULL REFERENCES CLIENT.FOODS(ID) ON DELETE CASCADE,
    NAME VARCHAR(255) NOT NULL,
    DESCRIPTION TEXT DEFAULT NULL
);

-- Diet JSON Persistance table
CREATE TABLE client.user_diet (
	FK_USER BIGSERIAL PRIMARY KEY NOT NULL REFERENCES CLIENT.USERS(ID) ON DELETE CASCADE,
	JSON_URL TEXT NOT NULL
);