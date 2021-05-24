# TrainGood
A web platform for people to find the personal trainer built with Node.js, Express, NextJS, MySQL. Trainers can post their details on this website and users can rate
and comment the trainers.

## Features of backend api server
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
