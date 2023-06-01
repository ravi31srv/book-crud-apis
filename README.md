# NestJs Simple Book-APP

If don't want to follow the steps given below and just want to explore the final output then this application is hosted on AWS ec2 instance. You can hit the [Swagger URL](http://3.111.219.124:5000/Doc) to play with APIs.

**_Getting Started_**

- **Clone the repository**

  > git clone https://github.com/ravi31srv/book-crud-apis.git

- **Switch to the repo folder**

  > cd book-crud-apis

- **Checkout into development branch**

  > git checkout development

- **Install dependencies**

  > npm install

- **Add .env file at the root level of direcory**

.env file example

```Dotenv
MONGO_URL="mongodb://localhost:27017/YOUR_DB_NAME"
SECRET="PAST YOUR SECRET HERE"
JWT_ROUNDS=12
CACHE_TIME=100000 #in milisecs
JWT_EXPIRATION_TIME='1d'
PORT=5000

```

- After installing dependencies & adding required env variables in .env file start the application using following command :

  > npm start

- **Authantication**

  This aplication used JSON Web Token to handle authentication. Then token is passed with each protected request endpoints using the Authorization header.

- **Swagger Documentation**

  This project uses the Nestjs swagger module for API documentation.
  [Documentation URL](http://3.111.219.124:5000/Doc)

- **Postman collection**

  https://file.io/BN6D51pggWbU

- **Socket.io connection**

  - In postman open new request
  - Select Socket.io as a request type from the top-left corner of the request (As show in image below )
  - Listen for the event mentioned in the images
  - Click the Connect button

  <img width="639" alt="image" src="https://github.com/ravi31srv/book-crud-apis/assets/34208768/648f6e67-d4c3-4560-a47d-2482ae3f4f0a">
