const inputTypes = require('./inputTypes/inputTypes')

// SDL Schema definition
const typeDefs = `#graphql
  type Category {
    categoryID: ID!
    text: String!
  }

  type Comment {
    commentID: ID!
    requestID: ID!
    userID: ID!
    datePosted: String!
    text: String!
    likes: Int!
  }

  type Notification {
    notificationID: ID!
    userID: ID!
    relatedItemID: ID
    relatedItemType: String!
    isRead: Boolean!
    dateCreated: String!
  }

  type Request {
    requestID: ID!
    categoryID: Int
    title: String!
    requestedBy: String!
    datePosted: String!
    brief: String
    descript: String
    postLenMin: Int
    postLenMax: Int!
    likes: Int!
  }

  type Requirement {
    requirementID: ID!
    requestID: ID!
    type: String!
    text: String!
  }

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

  type Tag {
    tagID: ID!
    text: String!
  }

  type Transaction {
    transactionID: ID!
    paidByID: ID!
    paidToID: ID!
    amount: Int!
    paymentDate: String!
  }

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

  type Query {
    categoryQueries: [Category]
    commentQueries: [Comment]
    notificationQueries: [Notification]
    requestQueries: [Request]
    requirementQueries: [Requirement]
    sceneQueries: [Scene]
    tagQueries: [Tag]
    transactionQueries: [Transaction]
    usersFindAll: [User]
    userFindOne(id: ID!): User
  }

  type Mutation {
    categoryCreate(input: CategoryInput): Category
    commentMutation: Comment
    notificationMutation: Notification
    requestMutation: Request
    requirementMutation: Requirement
    sceneMutation: Scene
    tagMutation: Tag
    transactionMutation: Transaction
    userCreate(input: UserInput): User
  }
`;


module.exports = typeDefs + inputTypes;
