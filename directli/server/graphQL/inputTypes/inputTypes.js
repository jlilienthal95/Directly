const inputTypes = `#graphql
  # Create Mutation Inputs
  # Category Table Input
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
  }

  # Notification Table Input
  input NotificationInput {
    userID: ID!
    relatedItemID: ID!
    relatedItemType: ContentType!
    dateCreated: String!
  }

  # Request Table Input
  input RequestInput {
    requestedBy: ID!
    categoryID: ID
    title: String!
    datePosted: String!
    brief: String
    descript: String
    postLenMin: Int
    postLenMax: Int!
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
    sceneUrl: String!
    thumbnailUrl: String!
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

  #Edit Mutation Types
  input CategoryEditInput {
    text: String
  }

  # Edit Comment Table Input (nullable fields for editing)
  input CommentEditInput {
    userID: ID
    relatedItemID: ID
    relatedItemType: ContentType
    datePosted: String
    text: String
  }

  # Edit Notification Table Input (nullable fields for editing)
  input NotificationEditInput {
    userID: ID
    relatedItemID: ID
    relatedItemType: ContentType
    dateCreated: String
  }

  # Edit Request Table Input (nullable fields for editing)
  input RequestEditInput {
    requestedBy: ID
    categoryID: ID
    title: String
    datePosted: String
    brief: String
    descript: String
    postLenMin: Int
    postLenMax: Int
  }

  # Edit Requirement Table Input (nullable fields for editing)
  input RequirementEditInput {
    requestID: ID
    type: String
    text: String
  }

  # Edit Scene Table Input (nullable fields for editing)
  input SceneEditInput {
    requestID: ID
    createdByID: ID
    sceneUrl: String
    thumbnailUrl: String
    dateSubmitted: String
    status: SceneStatus
    duration: Int
    resolution: String
  }

  # Edit Tag Table Input (nullable fields for editing)
  input TagEditInput {
    text: String
  }

  # Edit Transaction Table Input (nullable fields for editing)
  input TransactionEditInput {
    paidByID: ID
    paidToID: ID
    amount: Int
    paymentDate: String
  }

  # Edit User Table Input (nullable fields for editing)
  input UserEditInput {
    nameFirst: String
    nameLast: String
    displayName: String
    email: String
    phone: Int
    address: String
    dob: String
    bio: String
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