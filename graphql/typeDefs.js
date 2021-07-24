const { gql } = require('apollo-server')

const typeDefs = gql`
type Post {
    id: ID!,
    body: String!,
    createdAt: String!,
    username: String!
}
type User {
  id: ID!,
  username: String,
  email: String!,
  token: String!,
  createdAt: String!
},
input RegisterInput {
  username: String!,
  password: String!,
  confirmPassword: String!,
  email: String!
},
type Query {
  getPosts: [Post]
  getPost(postId: ID!): Post!
}
type Mutation {
  register(registerInput: RegisterInput) : User!,
  login(username: String!, password: String!): User!
  createPost(body: String!): Post!
  deletePost(postId: ID!): String!
}
`
module.exports = typeDefs