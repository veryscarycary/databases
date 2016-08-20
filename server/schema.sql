CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */
-- CREATE TABLE rooms (
--   /* Describe your table here.*/
--   ID INT AUTO_INCREMENT PRIMARY KEY,
--   name TEXT,
--   UNIQUE (name)
-- );

-- CREATE TABLE users (
--   /* Describe your table here.*/
--   ID INT AUTO_INCREMENT PRIMARY KEY,
--   name TEXT,
--   UNIQUE (name)
-- );

-- CREATE TABLE messages (
--   /* Describe your table here.*/
--   ID INT AUTO_INCREMENT PRIMARY KEY,
--   text TEXT,
--   createdAt DATE,
--   roomId INT,
--   userId INT,
--   FOREIGN KEY (roomId)
--     REFERENCES rooms(ID),
--   FOREIGN KEY (userId)
--     REFERENCES users(ID)
-- );

-- CREATE TABLE friends (
--   /* Describe your table here.*/
--   friend1 INT,
--   friend2 INT,
--   FOREIGN KEY (friend1)
--     REFERENCES users(ID),
--   FOREIGN KEY (friend2)
--     REFERENCES users(ID)
-- );



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

 -- ---
 -- Globals
 -- ---

 -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
 -- SET FOREIGN_KEY_CHECKS=0;

 -- ---
 -- Table 'Messages'
 -- 
 -- ---

 DROP TABLE IF EXISTS `Messages`;
    
 CREATE TABLE `Messages` (
   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
   `text` MEDIUMTEXT NULL DEFAULT NULL,
   `createdAt` DATE NULL DEFAULT NULL,
   `roomId` INTEGER NULL DEFAULT NULL,
   `userId` INTEGER NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'Rooms'
 -- 
 -- ---

 DROP TABLE IF EXISTS `Rooms`;
    
 CREATE TABLE `Rooms` (
   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
   `name` MEDIUMTEXT NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'Users'
 -- 
 -- ---

 DROP TABLE IF EXISTS `Users`;
    
 CREATE TABLE `Users` (
   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
   `name` MEDIUMTEXT NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'Friends'
 -- 
 -- ---

 DROP TABLE IF EXISTS `Friends`;
    
 CREATE TABLE `Friends` (
   `friend1` INTEGER NULL DEFAULT NULL,
   `friend2` INTEGER NULL DEFAULT NULL
 );

 -- ---
 -- Foreign Keys 
 -- ---

 ALTER TABLE `Messages` ADD FOREIGN KEY (roomId) REFERENCES `Rooms` (`id`);
 ALTER TABLE `Messages` ADD FOREIGN KEY (userId) REFERENCES `Users` (`id`);
 ALTER TABLE `Friends` ADD FOREIGN KEY (friend1) REFERENCES `Users` (`id`);
 ALTER TABLE `Friends` ADD FOREIGN KEY (friend2) REFERENCES `Users` (`id`);

 -- ---
 -- Table Properties
 -- ---

 -- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `Friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

 -- ---
 -- Test Data
 -- ---

 -- INSERT INTO `Messages` (`id`,`text`,`createdAt`,`roomId`,`userId`) VALUES
 -- ('','','','','');
 -- INSERT INTO `Rooms` (`id`,`name`) VALUES
 -- ('','');
 -- INSERT INTO `Users` (`id`,`name`) VALUES
 -- ('','');
 -- INSERT INTO `Friends` (`friend1`,`friend2`) VALUES
 -- ('','');