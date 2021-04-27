# MovieRecMachine

Find movies, see and add reviews, create lists of movies that you can send to your friends.

Built using The Movie Dataset from Kaggle: https://www.kaggle.com/rounakbanik/the-movies-dataset?select=movies_metadata.csv

## SQL
All the SQL code can be found in the root level of this repo. It's in [DB Project 2 Movies.sql](https://github.com/sunr1/MovieRecMachine/blob/main/DB%20Project%202%20Movies.sql)

This includes table creation, data insertion, indexes, views, stored procedures, and some other queries.

## Frontend

The MovieRecMachine is a react-app built with TypeScript and Semantic-UI.

## Backend

Our backend API is built with javascript and express using a MySQL database.

# Installation
Set up the API. You should already have MAMP running and have run the SQL queries.
```
cd movie-api
npm install
npm run dev
```

Set up the frontend.
```
cd movie-rec-app
yarn install
yarn start
```