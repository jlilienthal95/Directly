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
    user: User
    relatedItem: RelatedItem
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
    requestedByID: ID!
    categoryID: ID
    title: String!
    datePosted: String!
    brief: String
    descript: String
    postLenMin: Int
    postLenMax: Int!
    likes: Int!
    scenes: [Scene!]
    comments: [Comment!]
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
    createdBy: User
    comments: [Comment!]
  }

  type Tag {
    tagID: ID!
    text: String!
  }

  type Transaction {
    transactionID: ID!
    paidByID: ID!
    paidToID: ID!
    amount: Float!
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
    requests: [Request!]
    scenes: [Scene!]
    comments: [Comment!]
    notifications: [Notification!]
  }

  type Query {
    #Fetch Queries
    categoryFindAll: [Category]
    categoryFindOne(id: ID!): Category
    commentFindAll: [Comment]
    commentFindOne(id: ID!): Comment
    notificationFindAll: [Notification]
    notificationFindOne(id: ID!): Notification
    requestFindAll: [Request]
    requestFindOne(id: ID!): Request
    requirementFindAll: [Requirement]
    requirementFindOne(id: ID!): Requirement
    sceneFindAll: [Scene]
    sceneFindOne(id: ID!): Scene
    tagFindAll: [Tag]
    tagFindOne(id: ID!): Tag
    transactionFindAll: [Transaction]
    transactionFindOne(id: ID!): Transaction
    userFindAll: [User]
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

  # Union types
  union RelatedItem = Scene | Request
`;


module.exports = typeDefs + inputTypes;
