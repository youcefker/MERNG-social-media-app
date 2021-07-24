const { AuthenticationError } = require('apollo-server')
const Post = require('../../models/Post')
const checkAuth = require('../../util/checkAuth')


module.exports = {
    Query : {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts
            } catch(err) {
                throw new Error(err)
            }
        },

        getPost: async (_,{ postId }) => {
            try {
                const post = await Post.findById(postId)
                if(post) {
                    return post 
                } else {
                    throw new Error('post not find')
                }
            } catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        createPost: async (_, { body }, context) => {
            const user = checkAuth(context)
            const newPost = new Post({
                body, 
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })
            const post = newPost.save()
            return post
        },
        deletePost: async (_, { postId }, context) => {
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if(post.username === user.username) {
                    await post.delete()
                    return 'post deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch(err) {
                throw new Error(err)
            }
        }
    }
}