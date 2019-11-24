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
CREATE TYPE enum_Gender AS ENUM('Female', 'Male');
CREATE TYPE enum_ActivityType AS ENUM('None', 'Barely', 'Average', 'Active' ,'Very Active');
CREATE TYPE enum_BodyType AS ENUM('Obese', 'Overweight', 'Normal', 'Skinny');
CREATE TYPE enum_DietType AS ENUM('Strict', 'Regular', 'Permissive');

CREATE TABLE client.user_info (
    ID 		BIGSERIAL PRIMARY KEY REFERENCES CLIENT.USERS(ID) ON DELETE CASCADE,
    BMI     FLOAT(5) NOT NULL,
    BMR     FLOAT(5) DEFAULT 0.0,
    TEE     FLOAT(5) DEFAULT 0.0,
	IBW     FLOAT(5) DEFAULT 0.0,
    WEIGHT  FLOAT(5) NOT NULL,
    HEIGHT  FLOAT(5) NOT NULL,
    GENDER  VARCHAR(50) NOT NULL DEFAULT 'Male',
    BIRTH   DATE NOT NULL DEFAULT CURRENT_DATE,
    ACTIVITY_TYPE VARCHAR(50) NOT NULL DEFAULT 'None',
    BODY_TYPE VARCHAR(50) NOT NULL DEFAULT 'Normal',
    DIET_TYPE VARCHAR(50) DEFAULT 'Regular'
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
    ID BIGSERIAL PRIMARY KEY NOT NULL,
    NAME VARCHAR(255) NOT NULL,
    DESCRIPTION TEXT DEFAULT NULL
);

-- Relation Food - Food_Category table
CREATE TABLE client.food_list (
	FK_FOOD BIGSERIAL PRIMARY KEY NOT NULL REFERENCES CLIENT.FOODS(ID) ON DELETE CASCADE,
	FK_CATEGORY BIGSERIAL NOT NULL REFERENCES CLIENT.FOOD_CATEGORY(ID) ON DELETE CASCADE
);

-- Diet JSON Persistance table
CREATE TABLE client.diet (
	ID BIGSERIAL PRIMARY KEY NOT NULL,
	TOTAL_CALORIES SMALLINT NOT NULL,
	JSON_URL JSON DEFAULT NULL,
	CREATED_AT DATE DEFAULT CURRENT_DATE
);

-- Relation Diet - User table
CREATE TABLE client.diet_user (
	FK_USER BIGSERIAL PRIMARY KEY NOT NULL REFERENCES CLIENT.USERS(ID) ON DELETE CASCADE,
	FK_DIET BIGSERIAL NOT NULL REFERENCES CLIENT.DIET(ID) ON DELETE CASCADE
);

--> EXTRAS <-----

-- Subquery for category searching
SELECT * FROM CLIENT.FOODS WHERE ID IN (SELECT FK_FOOD FROM CLIENT.FOOD_LIST WHERE FK_CATEGORY = 2);

SELECT * FROM CLIENT.DIET WHERE TOTAL_CALORIES >= 1700 LIMIT 1;
SELECT * FROM CLIENT.DIET_USER;