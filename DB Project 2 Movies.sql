-- Rebecca Sun, Connor Waslo
-- rebecca.sun@vanderbilt.edu, connor.r.waslo@vanderbilt.edu
-- Project Part 2

-- a database of movies 
DROP DATABASE IF EXISTS movie_dataset; 
CREATE DATABASE IF NOT EXISTS movie_dataset;

USE movie_dataset;

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

SET sql_mode = "";

-- 2
LOAD DATA 
LOCAL INFILE '/Users/connor/Vanderbilt CS Classes/DB/The Movie Dataset/keywords.csv'
INTO TABLE movie_dataset.keywords 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;
        
LOAD DATA 
LOCAL INFILE '/Users/connor/Vanderbilt CS Classes/DB/The Movie Dataset/links.csv'
INTO TABLE movie_dataset.links 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;

LOAD DATA 
LOCAL INFILE '/Users/connor/Vanderbilt CS Classes/DB/The Movie Dataset/movies_metadata.csv'
INTO TABLE movie_dataset.movies_metadata 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;

LOAD DATA 
LOCAL INFILE '/Users/connor/Vanderbilt CS Classes/DB/The Movie Dataset/ratings.csv'
INTO TABLE movie_dataset.ratings 
		FIELDS TERMINATED BY ','
		ENCLOSED BY '"' 
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;

SELECT id, title, popularity
FROM movies_metadata
LIMIT 25;