CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  ID INT PRIMARY KEY,
  text TEXT,
  created_At DATE,
  id_Rooms INT,
  id_Users INT,
  FOREIGN KEY (id_Rooms)
    REFERENCES rooms(ID),
  FOREIGN KEY (id_Users)
    REFERENCES users(ID)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  /* Describe your table here.*/
  ID INT PRIMARY KEY,
  name TEXT
);

CREATE TABLE users (
  /* Describe your table here.*/
  ID INT PRIMARY KEY,
  name TEXT
);

CREATE TABLE friends (
  /* Describe your table here.*/
  friend1 INT,
  friend2 INT,
  FOREIGN KEY (friend1)
    REFERENCES users(ID),
  FOREIGN KEY (friend2)
    REFERENCES users(ID)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

