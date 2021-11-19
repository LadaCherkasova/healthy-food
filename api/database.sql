CREATE DATABASE healthy_food_database;
--\c into healthy_food_database

CREATE TABLE recipes(
  recipe_id SERIAL PRIMARY KEY,
  recipe_title varchar(255) NOT NULL,
  recipe_description varchar(255),
  recipe_preview varchar(255) NOT NULL,
  recipe_time integer NOT NULL,
  recipe_isVegan boolean NOT NULL,
  recipe_portions integer NOT NULL,
  recipe_isModerated boolean NOT NULL,
  recipe_previousRecipe integer
);

--set extension
CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  user_name varchar(255) NOT NULL,
  user_password varchar(255) NOT NULL,
  user_email varchar(255) NOT NULL,
  user_isAdmin boolean NOT NULL
);

INSERT INTO users (user_name, user_password, user_email, user_isAdmin) VALUES
--('lada', 'cher', 'ladacherkasovav@yandex.ru', true);

CREATE TABLE ingredients(
  ingredient_id SERIAL PRIMARY KEY,
  ingredient_name varchar(255) NOT NULL,
  ingredient_isModerated boolean
);

INSERT INTO ingredients (ingredient_name) VALUES
--...all ingredients;

CREATE TABLE types(
  type_id SERIAL PRIMARY KEY,
  type_name varchar(255) NOT NULL
);

INSERT INTO types (type_name) VALUES
--...all types;