const inputTypes = require('./inputTypes/inputTypes')

// SDL Schema definition
const typeDefs = `#graphql
  type Category {
    categoryID: ID!
    text: String!
  }

  type Comment {
    commentID: ID!
    userID: ID!
    relatedItemID: ID!
    relatedItemType: ContentType!
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
    requestedBy: ID!
    categoryID: ID
    title: String!
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
    sceneUrl: String!
    thumbnailUrl: String
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
    #Fetch Queries
    categoryFindAll: [Category]
    categoryFindOne(id: ID!): Category
    commentsFindAll: [Comment]
    commentFindOne(id: ID!): Comment
    notificationsFindAll: [Notification]
    notificationFindOne: Notification
    requestsFindAll: [Request]
    requestFindOne(id: ID!): Request
    requirementsFindAll: [Requirement]
    requirementFindOne(id: ID!): Requirement
    scenesFindAll: [Scene]
    sceneFindOne(id: ID!): Scene
    tagsFindAll: [Tag]
    tagFindOne(id: ID!): Tag
    transactionsFindAll: [Transaction]
    transactionFindOne(id: ID!): Transaction
    usersFindAll: [User]
    userFindOne(id: ID!): User
  }

  type Mutation {
    #Create Mutations
    categoryCreate(input: CategoryInput): Category
    commentCreate(input: CommentInput): Comment
    notificationCreate(input: NotificationInput): Notification
    requestCreate(input: RequestInput): Request
    requirementCreate(input: RequirementInput): Requirement
    sceneCreate(input: SceneInput): Scene
    tagCreate(input: TagInput): Tag
    transactionCreate(input: TransactionInput): Transaction
    userCreate(input: UserInput): User

    #Edit Mutations
    categoryEdit(id: ID!, input: CategoryEditInput!): Category,
    commentEdit(id: ID!, input: CommentEditInput!): Comment,
    notificationEdit(id: ID!, input: NotificationEditInput!): Notification,
    requestEdit(id: ID!, input: RequestEditInput!): Request,
    requirementEdit(id: ID!, input: RequirementEditInput!): Requirement,
    sceneEdit(id: ID!, input: SceneEditInput!): Scene,
    tagEdit(id: ID!, input: TagEditInput!): Tag,
    transactionEdit(id: ID!, input: TransactionEditInput!): Transaction,
    userEdit(id: ID!, input: UserEditInput!): User
    
    #Delete Mutations
    categoryDelete(id: ID!): Category,
    commentDelete(id: ID!): Comment,
    notificationDelete(id: ID!): Notification,
    requestDelete(id: ID!): Request,
    requirementDelete(id: ID!): Requirement,
    sceneDelete(id: ID!): Scene,
    tagDelete(id: ID!): Tag,
    transactionDelete(id: ID!): Transaction,
    userDelete(id: ID!): User

  }

  #enums
  enum ContentType {
    Request,
    Scene,
    Account
  }

  enum SceneStatus {
    Pending,
    Approved,
    Rejected
  }
`;


module.exports = typeDefs + inputTypes;
