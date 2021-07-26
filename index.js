const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')
const Post = require('./models/Post')

dotenv.config()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true})
    .then(result => {
        console.log('mongodb connected')
        return server.listen({port: 4000})
    }).then(res => {
        console.log('server running at', res.url)
    })

