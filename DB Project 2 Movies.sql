-- Rebecca Sun
-- rebecca.sun@vanderbilt.edu
-- Project Part 2

-- a database of movies 
DROP DATABASE IF EXISTS movie_dataset; 
CREATE DATABASE IF NOT EXISTS movie_dataset;

USE movie_dataset;

CREATE TABLE IF NOT EXISTS keywords(
		keywords_id INT ZEROFILL UNSIGNED NOT NULL, 
        keywords VARCHAR(70) NOT NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS links(
		movieId INT ZEROFILL UNSIGNED NOT NULL, 
        imdbId INT ZEROFILL UNSIGNED NOT NULL, 
        tmdbId INT ZEROFILL UNSIGNED NOT NULL
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS movies_metadata(
		adult bool NOT NULL, 
        belongs_to_collection VARCHAR(70) NOT NULL,
        budget INT ZEROFILL UNSIGNED NOT NULL,
        genres VARCHAR(70) NOT NULL,
        homepage VARCHAR(70) NOT NULL,
        id INT ZEROFILL UNSIGNED NOT NULL,
        imdb_id VARCHAR(70) NOT NULL,
        original_language VARCHAR(2) NOT NULL,
        original_title VARCHAR(70) NOT NULL,
        overview VARCHAR(70) NOT NULL,
        popularity FLOAT(10, 10) NOT NULL,
        poster_path VARCHAR(70) NOT NULL,
        production_companies VARCHAR(70) NOT NULL,
        production_countries VARCHAR(70) NOT NULL,
        release_date DATE NOT NULL,
        revenue INT ZEROFILL UNSIGNED NOT NULL,
        runtime FLOAT(5, 1) NOT NULL,
        spoken_languages VARCHAR(70) NOT NULL,
        status VARCHAR(70) NOT NULL,
        tagline VARCHAR(70) NOT NULL,
        title VARCHAR(70) NOT NULL,
        video BOOL NOT NULL,
        vote_average FLOAT(1, 1) NOT NULL,
        vote_count INT ZEROFILL UNSIGNED NOT NULL
) ENGINE=INNODB;                
        
CREATE TABLE IF NOT EXISTS ratings(
		userId INT ZEROFILL UNSIGNED NOT NULL,
        movieId INT ZEROFILL UNSIGNED NOT NULL,
        rating INT ZEROFILL UNSIGNED NOT NULL,
        timestamp INT ZEROFILL UNSIGNED NOT NULL
) ENGINE=INNODB;          

-- 2
LOAD DATA INFILE '/Users/sunr/Documents/Databases/project 2/keywords.csv'
INTO TABLE movie_dataset.keywords FIELDS TERMINATED BY '$'
ENCLOSED BY '"' LINES TERMINATED BY '\n';

LOAD DATA INFILE '/Users/sunr/Documents/Databases/project 2/movies_metadata.csv'
INTO TABLE movie_dataset.movies_metadata FIELDS TERMINATED BY '$'
ENCLOSED BY '"' LINES TERMINATED BY '\n';

LOAD DATA INFILE '/Users/sunr/Documents/Databases/project 2/links.csv'
INTO TABLE movie_dataset.links FIELDS TERMINATED BY '$'
ENCLOSED BY '"' LINES TERMINATED BY '\n';

LOAD DATA INFILE '/Users/sunr/Documents/Databases/project 2/ratings.csv'
INTO TABLE movie_dataset.ratings FIELDS TERMINATED BY '$'
ENCLOSED BY '"' LINES TERMINATED BY '\n';

SET sql_mode = "";

