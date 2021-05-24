# TrainGood
A web platform for people to find the personal trainer built with Node.js, Express, NextJS, MySQL. Trainers can post their details on this website and users can rate
and comment the trainers.

## Features of Backend API Server
| Functions              | Detail                                            | URL                         | Method |
| :--------------------: | ------------------------------------------------- | --------------------------- | ------ |
| Sign up for an account | Users can sign up an account by inputting their personal information. | /signup | Post |
| Log in | Users can log in their account. | /login | Post |
| View member details | Users can check their personal information. | /memberdetails | Post |
| Update member details | Users can change their personal information. | /updatememberdetails | Post |
| Rate trainers | Users can rate the trainers. | /ratept | Post |
| Show all trainers | 1. Users can find all trainers and their information. <br> 2. Pagination was used. | /showallpt/:page | Get |
| Count all trainers | Users can find the total of trainers in this websites. | /countallpt | Get |
| Add comment | 1. Users can comment the trainer. <br> 2. Users can upload their photos of training result before and after trained by the trainer. | /addcomment | Post |
| Show comment | 1. Users can view all comments on the trainer. 2. Pagination was used. | /getcomment/:ptid | Get |
| Delete comment | 1. Admin account can delete the comment. 2. If the user is not the admin, he cannot deleted the comment. | /delcomment/:commentid | Get |
| Show the top trainers | Users can view the top trainers with the highest rating. | /bestpt | Get |

## Features of Frontend API Server
| Functions              | Detail                                            | URL                         |
| :--------------------: | ------------------------------------------------- | --------------------------- |
| Home Page | 1. You can find the signup and showing trainers button here. <br> 2. You can find the top trainers here. | / |
| Find all trainers | 1. You can find all trainers <br> 2. You can rate trainers. <br> 3. You can comment trainers. | /showpt/:page |
| Sign Up | You can sign up an account. | /signup |
| Login | You can login here. | /login |

## Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [NodeJS](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/downloads/)

### Clone

Clone this repository to your local machine

```
$ git clone https://github.com/edwardtmw/TrainGood.git
```

### Setup

1. Change the setting of .env files under the backend folder. (.env.dev for development mode, .env.prod for production mode)
```
$ cd backend
```
Edit the files as followings:
```
# Host of MySQL
DB_HOST=<YOUR_MYSQL_HOST>
# Username for logging in MySQL
DB_USER=<YOUR_MYSQL_USERNAME>
# Password for logging in MySQL
DB_PW=<YOUR_MYSQL_PASSWORD>
# Name of database
DB_DB=<YOUR_MYSQL_DATABASE>
# A customized string of words stored in the server for calculating the JWT token
JWT_SECRET=<YOUR_JWT_SECRET>
```

2. Change the setting of .env file under the frontend folder. (.env.dev for development mode, .env.prod for production mode)
```
$ cd frontend/env
```
Edit the files as follwings:
```
# API URL for server side rendering. If you build this project in docker, please input 'http://<services>:<port>'. For example: 'http://backend:8080'
SERVER_API_HOST=<YOUR_API_URL>
# API URL for client side rendering. Just input the URL of backend server
BROWSER_API_HOST=<YOUR_API_URL>
```

3. If you need to depoly this project on Heroku, you should edit the package.json under the frontend folder.
Edit the line as following:
```
...
"start": "NEXT_PUBLIC_APP_ENV=prod next start -p $port
...
```
Furthermore, please don't use compose up to deploy on Heroku. You should build the images separately and push it to Heroku as followings:

3.1. If you are using Macbook with M1 chipset.
```
heroku login
heroku container:login
docker buildx build --platform linux/amd64 -t <myapp> .
docker tag <myapp> registry.heroku.com/<myapp>/web
docker push registry.heroku.com/<myapp>/web
heroku container:release web -a <myapp?>
```
3.2. Other than Macbook with M1 chipset. 
```
heroku login
heroku container:login
$ cd backend
heroku container:push web
heroku container:release web
$ cd frontend
heroku container:push web
heroku container:release web
```

4. Other than deploying on Heroku, you just input the following command on your local machine:
```
docker compose up
```
