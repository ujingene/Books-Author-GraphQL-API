//Define Schema i.e. object types, relationships
// import graphql
const graphql = require('graphql');

// Load the full build.
var _ = require('lodash');

const Book = require('../models/books');
const Author = require('../models/author');
const Genre = require('../models/genre');

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book', // object /model
    fields:()=> ({
        id: { type: new GraphQLNonNull(GraphQLID)},
        title: { type: new GraphQLNonNull(GraphQLString) },
        synopsis: { type: new GraphQLNonNull(GraphQLString)},
        genre: { type: new GraphQLNonNull(GraphQLID) },
        authorid: {type: new GraphQLNonNull(GraphQLID)  },

        //define relationship between books and author
        author: {
            type: AuthorType,
            resolve(parent, args){
                //console.log(parent);
               // return _.find(authors, {id: parent.authorid}); // local array
               return Author.findById(parent.authorid);
            }
        },

        //define relationship between Book and genre
        genre: {
            type: new GraphQLNonNull(GenreType),
            resolve(parent, args){
                //console.log(parent);

                return Genre.findById(parent.genre);
            }
        }
    })
});

const GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},

        //define relationship  between genre and book
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent);

                return Book.find({genre: parent.id});
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author', // object /model
    fields:()=> ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: {type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return _.filter(books, {authorid:parent.id});

               return Book.find({authorid: parent.id});
            }
        }
    })
});


//Define Root Queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                //code to get data from dummy data
              //  return _.find(books, {id: args.id});
              return Book.findById(args.id);
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
              //  return books;

              return Book.find({});
            }
        },

        genre: {
            type: GenreType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Genre.findById(args.id);
            }
        },

        genres:{
            type: new GraphQLList(GenreType),
            resolve(parent, args){
                return Genre.find({});
            }
        },

        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
              //  return _.find(authors, {id: args.id});
              return Author.findById(args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
              //  return authors;

              return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                age: {type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },

        addBook: {
            type: BookType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString) },
                genre: {type: new GraphQLNonNull(GraphQLString) },
                synopsis: { type: new GraphQLNonNull(GraphQLString)},
                authorid: {type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    title: args.title,
                    synopsis: args.synopsis,
                    genre: args.genre,
                    authorid: args.authorid
                });
                return book.save();
            }
        },

        addGenre: {
            type: GenreType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let genre = new Genre({
                    name: args.name
                });
                return genre.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});