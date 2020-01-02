DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  customer_id VARCHAR(255), -- check stripe customer_id format.
  is_deleted BOOLEAN DEFAULT FALSE
);

INSERT INTO users(name, password, email, phone, customer_id)
VALUES ('Jay', '$2b$10$AlzIaZxqfB3ttQZ8xqB.y.m0ZDJqkEOlaO1reCsW4p1Iinr1z4qNa', 'jay@gmail.com', '4162793971', '1');

INSERT INTO users(name, password, email, phone, customer_id)
VALUES ('Matt', '$2b$10$AlzIaZxqfB3ttQZ8xqB.y.m0ZDJqkEOlaO1reCsW4p1Iinr1z4qNa', 'matt@gmail.com', '4162793971', '2');

INSERT INTO users(name, password, email, phone, customer_id)
VALUES ('Dan', '$2b$10$AlzIaZxqfB3ttQZ8xqB.y.m0ZDJqkEOlaO1reCsW4p1Iinr1z4qNa', 'dan@gmail.com', '4162793971', '3');