const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    genre: String,
    authorid: String,
    synopsis: String
});

module.exports = mongoose.model('Book', bookSchema);