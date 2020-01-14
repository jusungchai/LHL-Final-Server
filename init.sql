DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS jobbers CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;

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
  is_deleted BOOLEAN DEFAULT FALSE,
  lat NUMERIC DEFAULT -79.4023121,
  long NUMERIC DEFAULT 43.6441011
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY NOT NULL,
  is_deleted BOOLEAN DEFAULT false,
  service_type VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  jobber_id INTEGER REFERENCES jobbers(id) DEFAULT NULL,
  user_confirm BOOLEAN DEFAULT false,
  jobber_confirm BOOLEAN DEFAULT false,
  description VARCHAR(255) NOT NULL,
  hourly_rate INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  fulfilled_at TIMESTAMP DEFAULT NULL,
  time_estimate SMALLINT DEFAULT NULL,
  street_address VARCHAR(255) NOT NULL,
  post_code CHAR(6) NOT NULL,
  lat NUMERIC NOT NULL,
  long NUMERIC NOT NULL
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
VALUES ('Construction');

INSERT INTO skills(name)
VALUES ('Home Maintenance');

INSERT INTO skills(name)

VALUES ('Health');

INSERT INTO skills(name)
VALUES ('Cleaning');

INSERT INTO skills(name)
VALUES ('Farm Work');

INSERT INTO skills(name)
VALUES ('Investigation');

INSERT INTO skills(name)
VALUES ('Yard Work');

INSERT INTO skills(name)
VALUES ('Clowning');

INSERT INTO skills(name)
VALUES ('Siege');

INSERT INTO skills(name)
VALUES ('Painting');

INSERT INTO skills(name)
VALUES ('Pet Sitting');

INSERT INTO skills(name)
VALUES ('Construction');

INSERT INTO skills(name)
VALUES ('Code');

INSERT INTO jobs(
    is_deleted,
    service_type, 
    user_id, 
    description, 
    hourly_rate,
    time_estimate, 
    street_address,
    post_code,
    lat,
    long) 
  VALUES (
    false,
    'Personal Health',
    1,
    'A good, quality foot rub',
    50,
    1,
    '300 Queen St. West',
    'M5V2A2',
    43.9532233,
    -79.48128629999999
  );

INSERT INTO jobs(
    is_deleted,
    service_type, 
    user_id, 
    description, 
    hourly_rate,
    time_estimate, 
    street_address,
    post_code,
    lat,
    long) 
  VALUES (
    false,
    'Lawn Mow',
    1,
    'This lawn aint gonna mow itself',
    20,
    2,
    '300 Queen St. West',
    'M5H4G1',
    43.64931790000001,
    -79.39494759999999
  );

INSERT INTO jobs(
    is_deleted,
    service_type, 
    user_id, 
    description, 
    hourly_rate,
    time_estimate, 
    street_address,
    post_code,
    lat,
    long) 
  VALUES (
    false,
    'Pet Sitting',
    3,
    'My cat needs a brushing',
    25,
    0.5,
    '300 Queen St. West',
    'M5J2T6',
    43.777,
    -79.777
  );
