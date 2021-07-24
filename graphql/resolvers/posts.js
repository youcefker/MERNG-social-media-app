const Post = require('../../models/Post')

module.exports = {
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