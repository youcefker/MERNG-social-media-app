const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const Post = require('./models/Post')

dotenv.config()



const resolvers = {
    Query : {
        getPosts: async () => {
            try {
                const posts = await Post.find()
                return posts
            } catch(err) {
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true})
    .then(result => {
        console.log('mongodb connected')
        return server.listen({port: 8000})
    }).then(res => {
        console.log('server running at', res.url)
    })

