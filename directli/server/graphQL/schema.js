// schema.js
const { Pool } = require('pg');

// Assuming you're using PostgreSQL
const pool = new Pool();  // Connection to your PostgreSQL database

// SDL Schema definition
const typeDefs = `#graphql
  # Define Category Type
  type Category {
    categoryID: ID!
    value: String!
  }

  # Define Comment Type
  type Comment {
    commentID: ID!
    requestID: ID!
    userID: ID!
    datePosted: String!
    value: String!
    likes: Int!
  }

  # Define Notification Type
  type Notification {
    notificationID: ID!
    userID: ID!
    relatedItemID: ID
    relatedItemType: String!
    isRead: Boolean!
    dateCreated: String!
  }

  # Define Request Type
  type Request {
    requestID: ID!
    categoryID: Int
    title: String!
    requestedBy: String!
    datePosted: String!
    brief: String
    desc: String
    postLenMin: Int
    postLenMax: Int!
    likes: Int!
  }

  # Define Requirement Type
  type Requirement {
    requirementID: ID!
    requestID: ID!
    type: String!
    value: String!
  }

  # Define Scene Type
  type Scene {
    sceneID: ID!
    requestID: ID!
    createdByID: ID!
    sceneURL: String!
    thumbnailURL: String
    dateSubmitted: String!
    status: String!
    duration: Int!
    resolution: String!
  }

  # Define Tag Type
  type Tag {
    tagID: ID!
    value: String!
  }

  # Define Transaction Type
  type Transaction {
    transactionID: ID!
    paidByID: ID!
    paidToID: ID!
    value: Int!
    paymentDate: String!
  }

  # Define User Type
  type User {
    userID: ID!
    nameFirst: String!
    nameLast: String!
    displayName: String!
    email: String!
    phone: Int!
    address: String!
    dob: String!
    bio: String!
    profPicUrl: String
  }

  # Define Queries
  type Query {
    categoryQueries: [Category]
    commentQueries: [Comment]
    notificationQueries: [Notification]
    requestQueries: [Request]
    requirementQueries: [Requirement]
    sceneQueries: [Scene]
    tagQueries: [Tag]
    transactionQueries: [Transaction]
    userQueries: [User]
  }

  # Define Mutations
  type Mutation {
    categoryMutation: Category
    commentMutation: Comment
    notificationMutation: Notification
    requestMutation: Request
    requirementMutation: Requirement
    sceneMutation: Scene
    tagMutation: Tag
    transactionMutation: Transaction
    userMutation: User
  }

`;

module.exports = {
  typeDefs,
  pool, // Exporting pool for database interaction, you can use it to query your DB in resolvers
};
