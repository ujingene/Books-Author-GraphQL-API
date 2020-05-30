const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cors
app.use(cors());

 //localhost connection
mongoose.connect('mongodb://localhost:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

mongoose.connection.once('open', () => {
    console.log('Connected to localhost database');
})

// GraphQl Middleware
app.use('/graphql', graphqlHTTP({
schema,
graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000...');
});

