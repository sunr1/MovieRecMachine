-- Rebecca Sun, Connor Waslo
-- rebecca.sun@vanderbilt.edu, connor.r.waslo@vanderbilt.edu
-- Project Part 2

-- Create database
DROP DATABASE IF EXISTS movie_dataset; 
CREATE DATABASE IF NOT EXISTS movie_dataset;

USE movie_dataset;

-- Create tables
DROP TABLE IF EXISTS credits;
CREATE TABLE IF NOT EXISTS credits(
		cast TEXT NOT NULL, 
        crew TEXT NOT NULL,
        creditsId INT UNSIGNED NOT NULL, 
        PRIMARY KEY(creditsId)
) ENGINE=INNODB;

DROP TABLE IF EXISTS keywords;
CREATE TABLE IF NOT EXISTS keywords(
		keywordsId INT UNSIGNED NOT NULL, 
        keywords TEXT,
        PRIMARY KEY(keywordsId)
) ENGINE=INNODB;

DROP TABLE IF EXISTS links;
CREATE TABLE IF NOT EXISTS links(
		movieId INT UNSIGNED NOT NULL, 
        imdbId INT UNSIGNED NOT NULL, 
        tmdbId INT UNSIGNED NOT NULL,
        PRIMARY KEY (movieId)
) ENGINE=INNODB;

DROP TABLE IF EXISTS movies_metadata;
CREATE TABLE IF NOT EXISTS movies_metadata(
		adult bool NOT NULL, 
        belongs_to_collection TEXT,
        budget INT UNSIGNED NOT NULL,
        genres TEXT,
        homepage VARCHAR(120) NOT NULL,
        id INT UNSIGNED AUTO_INCREMENT NOT NULL,
        imdb_id VARCHAR(10) NOT NULL,
        original_language VARCHAR(2) NOT NULL,
        original_title VARCHAR(70) NOT NULL,
        overview TEXT NOT NULL,
        popularity DECIMAL(8, 6) NOT NULL,
        poster_path VARCHAR(70),
        production_companies TEXT NOT NULL,
        production_countries TEXT NOT NULL,
        release_date DATE NOT NULL,
        revenue INT UNSIGNED NOT NULL,
        runtime FLOAT(5, 1) NOT NULL,
        spoken_languages TEXT NOT NULL,
        status VARCHAR(70) NOT NULL,
        tagline TEXT NOT NULL,
        title VARCHAR(70) NOT NULL,
        video BOOL NOT NULL,
        vote_average DECIMAL(3, 1) NOT NULL,
        vote_count INT UNSIGNED NOT NULL,
        PRIMARY KEY(id)
) ENGINE=INNODB;                
        
DROP TABLE IF EXISTS ratings;
CREATE TABLE IF NOT EXISTS ratings(
		userId INT UNSIGNED NOT NULL,
        movieId INT UNSIGNED NOT NULL,
        rating DECIMAL(2,1) NOT NULL,
        unixTime BIGINT NOT NULL,
        PRIMARY KEY (userId, movieId)
) ENGINE=INNODB;

DROP TABLE IF EXISTS movie_list;
CREATE TABLE IF NOT EXISTS movie_list(
		listId VARCHAR(70) NOT NULL,
        description TEXT,
        date_created DATETIME, 
        average_popularity DECIMAL(3, 1) NOT NULL,
		average_rating DECIMAL(2,1) NOT NULL,
        PRIMARY KEY (listId)
) ENGINE=INNODB;

DROP TABLE IF EXISTS movies_in_list;
CREATE TABLE IF NOT EXISTS movies_in_list(
		m_id INT UNSIGNED AUTO_INCREMENT,
        listId VARCHAR(70) NOT NULL,
        id INT UNSIGNED NOT NULL,
        CONSTRAINT fk_list_id FOREIGN KEY (listId) 
			REFERENCES movie_list(listId),
		CONSTRAINT fk_movie_id FOREIGN KEY (id)
			REFERENCES movies_metadata(id),
		PRIMARY KEY(m_id)
) ENGINE=INNODB;  

SET sql_mode = "";

-- Insert data from CSVs into tables
LOAD DATA 
LOCAL INFILE '/Users/sunr/Documents/Databases/credits.csv'
INTO TABLE movie_dataset.credits 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;

LOAD DATA 
LOCAL INFILE '/Users/sunr/Documents/Databases/keywords.csv'
INTO TABLE movie_dataset.keywords 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;
        
LOAD DATA 
LOCAL INFILE '/Users/sunr/Documents/Databases/links.csv'
INTO TABLE movie_dataset.links 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;

LOAD DATA 
LOCAL INFILE '/Users/sunr/Documents/Databases/movies_metadata.csv'
INTO TABLE movie_dataset.movies_metadata 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;

LOAD DATA 
LOCAL INFILE '/Users/sunr/Documents/Databases/ratings.csv'
INTO TABLE movie_dataset.ratings 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;

-- Indexes
CREATE INDEX popularity 
ON movies_metadata(popularity);

CREATE INDEX vote_average 
ON movies_metadata(vote_average);

CREATE INDEX title 
ON movies_metadata(title);

CREATE INDEX date_created 
ON movies_list(date_created);

CREATE INDEX average_popularity 
ON movies_list(average_popularity);

-- Views
CREATE VIEW movie_metadata_view AS
SELECT id, title, overview, vote_average, popularity, release_date
FROM movies_metadata;

CREATE VIEW movie_popularity_view AS
SELECT * 
FROM movie_metadata_view
ORDER BY popularity DESC;

CREATE VIEW movie_rating_view AS
SELECT *
FROM movie_metadata_view
ORDER BY vote_average DESC;

CREATE VIEW movie_list_view AS
SELECT lst.listId, description, average_popularity, date_created, title, overview, vote_average, popularity, release_date
FROM movie_list lst
		JOIN movies_in_list con ON lst.listId = con.listId
        JOIN movies_metadata mov ON con.id = mov.id;
        
-- Relevant select query
SELECT lst.listId, AVG(popularity) AS avg_pop, date_created
FROM movie_list lst
		JOIN movies_in_list con ON lst.listId = con.listId
        JOIN movies_metadata mov ON con.id = mov.id
GROUP BY lst.listId
ORDER BY avg_pop DESC;

-- Stored procedures
DROP PROCEDURE IF EXISTS create_movie_list;

DELIMITER // 

CREATE PROCEDURE create_movie_list(IN listId VARCHAR(70), IN description TEXT, 
		IN date_created DATETIME, IN average_popularity DECIMAL(3, 1), IN average_rating DECIMAL(2, 1))
BEGIN

	INSERT INTO movie_list (
		listId, 
        description, 
        date_created, 
        average_popularity, 
        average_rating
	)
	VALUES (
		listId, 
        description, 
        date_created, 
        average_popularity, 
        average_rating
	);

END // 

DELIMITER ;


DROP PROCEDURE IF EXISTS add_movie_to_list;

DELIMITER // 

CREATE PROCEDURE add_movie_to_list(IN listId VARCHAR(70), IN movieId TEXT)
BEGIN

	INSERT INTO movies_in_list (
		listId, 
        id
	)
	VALUES (
		listId, 
        movieId
	);

END // 

DELIMITER ;