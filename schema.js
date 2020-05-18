const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  type Cocktail {
    name: String!
    instructions: String!
    glass: String!
    ingredients: [String!]!
    measurements: [String!]!
    using: [String!]!
    photo: String!
    using2: [Cocktail]
  }
  type User {
    email: String!
    password: String!
    ingredients: [Ingredient]
  }
  type Ingredient {
    name: String!
    img: String!
    cocktails: [Cocktail]
  }
`;