DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS jobbers CASCADE;
DROP TABLE IF EXISTS skills CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  customer_id VARCHAR(255), -- check stripe customer_id format.
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE jobbers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

INSERT INTO users(name, password, email, phone, customer_id)
VALUES ('Jay', '$2b$10$AlzIaZxqfB3ttQZ8xqB.y.m0ZDJqkEOlaO1reCsW4p1Iinr1z4qNa', 'jay@gmail.com', '4162793971', '1');

INSERT INTO users(name, password, email, phone, customer_id)
VALUES ('Matt', '$2b$10$AlzIaZxqfB3ttQZ8xqB.y.m0ZDJqkEOlaO1reCsW4p1Iinr1z4qNa', 'matt@gmail.com', '4162793971', '2');

INSERT INTO users(name, password, email, phone, customer_id)
VALUES ('Dan', '$2b$10$AlzIaZxqfB3ttQZ8xqB.y.m0ZDJqkEOlaO1reCsW4p1Iinr1z4qNa', 'dan@gmail.com', '4162793971', '3');

INSERT INTO jobbers(name, password, email, phone)
VALUES ('Kevin', '$2b$10$AlzIaZxqfB3ttQZ8xqB.y.m0ZDJqkEOlaO1reCsW4p1Iinr1z4qNa', 'kevin@gmail.com', '4162793971');

INSERT INTO skills(name)
VALUES ('Snow Plow');

INSERT INTO skills(name)
VALUES ('Lawn Mow');

INSERT INTO skills(name)
VALUES ('Escort');