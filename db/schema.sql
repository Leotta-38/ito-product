CREATE DATABASE game_ito;

CREATE TABLE players(
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  uuid TEXT NOT NULL,
  number INTEGER UNIQUE,
  response TEXT,
  orderid INTEGER UNIQUE
);

CREATE TABLE topics(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  min TEXT NOT NULL,
  max TEXT NOT NULL
);

CREATE TABLE rooms(
  id SERIAL PRIMARY KEY,
  is_going boolean NOT NULL   
);

INSERT INTO rooms (is_going) 
VALUES (false)
RETURNING *;

INSERT INTO topics (name, min, max) 
VALUES ('The strong animal', 'weakest', 'strongest')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The country you want to live in', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular male singer', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular female singer', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular anime character', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular Japanese food', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular movie', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular athelete', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular sport', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The place you want to go on honeymoon', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular holiday destination', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The living creature you want to be', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The super power you want to have', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular animal at the zoo', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The Christmas present that makes you happy', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The city you want to go in summer', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The city you want to go in winter', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The food you would choose if you could only eat this for the rest of your life', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The magic you would want to use if you were a wizard', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('The animal that runs fast', 'slowest', 'fastest')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular app', 'least', 'most')
RETURNING *;
INSERT INTO topics (name, min, max) 
VALUES ('Popular alcoholic drink', 'least', 'most')
RETURNING *;
