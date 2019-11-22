CREATE TYPE e_Sexo AS ENUM('Hombre', 'Mujer'); --Enum para elegir sexo

CREATE TABLE public.Diet(
	ID_Diet 	bigserial PRIMARY KEY,
	FK_UserID	bigserial NOT NULL,
	URL			text
);


CREATE TABLE public.User(
	ID_User		bigserial PRIMARY KEY,
	Username 	VARCHAR(50)     NOT NULL UNIQUE,
	Email		VARCHAR(50)     NOT NULL UNIQUE, 
	Password	VARCHAR(255)    NOT NULL
);

CREATE TABLE public.UserInfo(
	ID_UserInfo     bigserial PRIMARY KEY,
	FK_UserID	    int,
	IMC			    float(5),
	Peso		    float(5),
	Estatura	    float(3),
	Sexo		    e_Sexo,
	fNacimiento	    date
);

CREATE TABLE public.FoodCategory(
	ID_FoodCategory	    bigserial PRIMARY KEY,
	Name			    VARCHAR(100)
);

CREATE TABLE public.Food(
	ID_Food	        bigserial PRIMARY KEY,
	FK_FoodCatID    bigserial NOT NULL,
	Name	        varchar(100)
);

CREATE TABLE public.Token(
	ID_Token	BIGSERIAL PRIMARY KEY,
	FK_UserID	BIGSERIAL NOT NULL,
	Domain		VARCHAR(100)
);

--Llaves foraneas relacionadas con la tabla de user
ALTER TABLE public.Diet
ADD CONSTRAINT fk_user_diet FOREIGN KEY (FK_UserID) REFERENCES public.User(ID_User);

ALTER TABLE public.UserInfo
ADD CONSTRAINT fk_user_info FOREIGN KEY (FK_UserID) REFERENCES public.User(ID_User);

ALTER TABLE public.Token
ADD CONSTRAINT fk_user_token FOREIGN KEY (FK_UserID) REFERENCES public.User(ID_User);

--Llaves foraneas relacionadas con la categoria de la comida
ALTER TABLE public.Food
ADD CONSTRAINT fk_food_category FOREIGN KEY (FK_FoodCatID) REFERENCES public.FoodCategory(ID_FoodCategory);

