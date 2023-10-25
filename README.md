# Polling Application

Polling Application is a web-based application that allows users to create and participate in polls. Users can create questions, define options, and vote on their preferred options. This README provides an overview of the project, installation instructions, and usage guidelines.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- User registration and authentication
- Create, edit, and delete questions
- Add, edit, and delete options for questions
- Vote on options
- View voting history
- User profile with personal information


Certainly, here's a basic README template for your project. Feel free to customize it with specific details about your project:

markdown
Copy code
# Polling Application

Polling Application is a web-based application that allows users to create and participate in polls. Users can create questions, define options, and vote on their preferred options. This README provides an overview of the project, installation instructions, and usage guidelines.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Project Structure](#project-structure)


## Features

- User registration and authentication
- Create, edit, and delete questions
- Add, edit, and delete options for questions
- Vote on options
- View voting history
- User profile with personal information

## Usage
MONGODB_URI= mongodb://localhost:27017/Polling-Application

- User Registration and Authentication : Register a new user using : http://localhost:8002/user/signup or log in using :  http://localhost:8002/user/login credentials : Email: Pra@gmail.com Password: 123
- Create a Question : After logging in, create a new question by providing a title and description using : http://localhost:8002/postman/questions/create on Postman
- Add Options to a Question : For a question you've created, add options that other users can vote on using : http://localhost:8002/postman/questions/:questionsId/options/create on Postman
- Vote on Options : Users can vote on options for any question using :  http://localhost:8002/postman/:userId/options/:optionId/add_vote on Postman
- View Voting History : Users can view their voting history, including questions, options, and their votes using : http://localhost:8002/user/history? but user need to login first
- To display a list of all available polls to users use : http://localhost:8002/ but user need to login first

## Project Structure

models/: Contains the database models for User, Questions, Options, and Votes.
routes/: Defines the application's routes and controllers.
views/: Contains EJS templates for rendering web pages.
config/: Configuration files for the application.
index.js: Main application file.
