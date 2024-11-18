const inputTypes = `#graphql

  input CategoryInput {
    text: String!
  }

  # Comment Table Input
  input CommentInput {
    userID: ID!
    relatedItemID: ID!
    relatedItemType: ContentType!
    datePosted: String!
    text: String!
    likes: Int!
  }

  # Notification Table Input
  input NotificationInput {
    userID: ID!
    relatedItemID: ID!
    relatedItemType: ContentType!
    isRead: Boolean!
    dateCreated: String!
  }

  # Request Table Input
  input RequestInput {
    categoryID: ID
    title: String!
    requestedBy: String!
    datePosted: String!
    brief: String
    descript: String
    postLenMin: Int
    postLenMax: Int!
    likes: Int!
  }

  # Requirement Table Input
  input RequirementInput {
    requestID: ID!
    type: String!
    text: String!
  }

  # Scene Table Input
  input SceneInput {
    requestID: ID!
    createdByID: ID!
    sceneURL: String!
    thumbnailURL: String!
    dateSubmitted: String!
    status: SceneStatus!
    duration: Int!
    resolution: String!
  }

  # Tag Table Input
  input TagInput {
    text: String!
  }

  # Transaction Table Input
  input TransactionInput {
    userID: ID!
    paidByID: ID!
    paidToID: ID!
    amount: Int!
    paymentDate: String!
  }

  # User Table Input
  input UserInput {
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

module.exports = inputTypes;