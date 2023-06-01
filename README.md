# NestJs Simple Book--APP

If don't want to follow the steps given below and just want to explore the final out then this application is hosted on AWS ec2. You can hit the [Swagger URL](http://3.111.219.124:5000/Doc) to play with APIs.


***Getting Started***

**Installation** 

**Clone the repository**

  > git clone https://github.com/ravi31srv/book-crud-apis.git

**switch to the repo folder**

  > cd book-crud-apis

**checkout into development branch**

  > git checkout development

**Install dependencies**
  
   > npm install

**add .env file at the root level of direcory**

.env file example 
```Dotenv
MONGO_URL="mongodb://localhost:27017/YOUR_DB_NAME"
SECRET="PAST YOUR SECRET HERE"
JWT_ROUNDS=12
CACHE_TIME=100000 #in milisecs
JWT_EXPIRATION_TIME='1d'
PORT=5000

```

After installing dependencies & adding required env variables in .env file start the application using following command :

> npm start
 
**Authantication**
This aplication used JSON Web Token to handle authentication. Then token is passed with each protected requet endpoints using the Authorization header.


**Swagger Documentation**
This project uses the Nestjs swagger module for API documentation.




