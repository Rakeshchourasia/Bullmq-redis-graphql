const typeDefs = `#graphql

type Video {
  id: ID!
  title: String!
  url: String
  status: String
}

type Query {
  videos:[Video]
}

type Mutation {
  uploadVideo(
    title:String!
  ):Video
}

type User {
  id: ID!
  name: String!
  email: String!
}

type AuthPayload {
  token: String!
  user: User!
}

type Mutation {
  register(
    name: String!
    email: String!
    password: String!
  ): AuthPayload

  login(
    email: String!
    password: String!
  ): AuthPayload
}

`;


module.exports = typeDefs;