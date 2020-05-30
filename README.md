# Books-Author-GraphQL-API
This is the Back end of the Books - Author React App. Built using NodeJS, GraphQL and persist data in MongoDB


### Required Development Environment. 

```
Ensure the following are installed.
```
- Node v5 + [Download](https://nodejs.org/en/download/)
- MongoDb Compass Community [Download](https://www.mongodb.com/download-center/compass)

### Clone the App from github
```
https://github.com/ujingene/Books-Author-GraphQL-API.git

```

### Edit Mongo Cloud Connection
To use ths cloud connection un comment the below code in app.s and edit your connection string.

```js
//connect to MongoDb Cloud
const uri = "mongodb+srv://test:EyWNn3ThM7GwmxZg@cluster0-wcgph.mongodb.net/test?retryWrites=true&w=majority";

 mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000 // Timeout after 5s instead of 30s
}); 

```

### Start Application
To start the server application run
```bash
npm start
```

## Application Info

### Author

[Eugene Wanjira](http://www.github.com/ujingene)

### Version

1.0.0

### License

This project is licensed under the MIT License
