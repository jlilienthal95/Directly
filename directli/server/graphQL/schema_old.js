const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLID, GraphQLBoolean, GraphQLNonNull } = require('graphql');
const { Pool } = require('pg');
const pool = new Pool();  // Assuming you're using PostgreSQL

//GraphQL query type imports - update as tables are created
const CategoryQuery = require('./queries/CategoryQuery');
const CommentQuery = require('./queries/CommentQuery');
const NotificationQuery = require('./queries/NotificationQuery');
const RequestQuery = require('./queries/RequestQuery');
const RequirementQuery = require('./queries/RequirementQuery');
const SceneQuery = require('./queries/SceneQuery');
const TagQuery = require('./queries/TagQuery');
const TransactionQuery = require('./queries/TransactionQuery');
const UserQuery = require('./queries/UserQuery');
//GraphQL mutation type import - update as tables are created
const { CategoryMutation } = require('./mutations/CategoryMutation');
const { CommentMutation } = require('./mutations/CommentMutation');
const { NotificationMutation } = require('./mutations/NotificationMutation');
const { RequestMutation } = require('./mutations/RequestMutation');
const { RequirementMutation } = require('./mutations/RequirementMutation');
const { SceneMutation } = require('./mutations/SceneMutation');
const { TagMutation } = require('./mutations/TagMutation');
const { TransactionMutation } = require('./mutations/TransactionMutation');
const { UserMutation } = require('./mutations/UserMutation');

// Define the User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    userID: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    profPicUrl: { type: GraphQLString }
  })
});

// Define the Request Type
const RequestType = new GraphQLObjectType({
  name: 'Request',
  fields: () => ({
    requestID: { type: GraphQLID },
    title: { type: GraphQLString },
    brief: { type: GraphQLString },
    desc: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    datePosted: { type: GraphQLString },
    postLenMin: { type: GraphQLInt },
    postLenMax: { type: GraphQLInt },
    postType: { type: GraphQLString },
    likes: { type: GraphQLInt }
  })
});

// Define the Scene Type
const SceneType = new GraphQLObjectType({
  name: 'Scene',
  fields: () => ({
    sceneID: { type: GraphQLID },
    requestID: { type: GraphQLID },
    createdBy: { type: GraphQLString },
    sceneURL: { type: GraphQLString },
    thumbnailURL: { type: GraphQLString },
    dateSubmitted: { type: GraphQLString },
    status: { type: GraphQLString },
    duration: { type: GraphQLInt },
    resolution: { type: GraphQLString }
  })
});

const TransactionType = new GraphQLObjectType({
    name: 'Transaction',
    fields: () => ({
        transactionID: { type: GraphQLID },
        value: { type: GraphQLInt },
        paymentDate: { type: GraphQLString },
        paidByID : { type: GraphQLID },
        paidToID: { type: GraphQLID },
    })
})

const RequirementType = new GraphQLObjectType({
    name: 'Requirement',
    fields: () => ({
        requirementID: { type: GraphQLID },
        requestID: { type: GraphQLID },
        type: { type: GraphQLString },
        value: { type: GraphQLString },
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        commentID: { type: GraphQLID },
        requestID: { type: GraphQLID },
        userID: { type: GraphQLID },
        datePosted: { type: GraphQLString },
        value: { type: GraphQLString },
        likes: { type: GraphQLInt }
    })
})

const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        notificationID: { type: GraphQLID },
        userID: { type: GraphQLID },
        relatedItem: { type: GraphQLID },
        isRead: { type: GraphQLBoolean },
        dateCreated: { type: GraphQLString },
        type: { type: GraphQLString },
    })
})

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        categoryID: { type: GraphQLID },
        value: { type: GraphQLString }
    })
})

const TagType = new GraphQLObjectType({
    name: 'Tag',
    fields: () => ({
        tagID: { type: GraphQLID },
        value: { type: GraphQLString }
    })
})

// Root Query - define all the queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      categoryQueries: {
        type: CategoryQuery,
        resolve: CategoryQuery.resolve, // Assuming you have a `resolve` function inside CategoryQuery
      },
      commentQueries: {
        type: CommentQuery,
        resolve: CommentQuery.resolve, // Same here
      },
      notificationQueries: {
        type: NotificationQuery,
        resolve: NotificationQuery.resolve,
      },
      requestQueries: {
        type: RequestQuery,
        resolve: RequestQuery.resolve,
      },
      requirementQueries: {
        type: RequirementQuery,
        resolve: RequirementQuery.resolve,
      },
      sceneQueries: {
        type: SceneQuery,
        resolve: SceneQuery.resolve,
      },
      tagQueries: {
        type: TagQuery,
        resolve: TagQuery.resolve,
      },
      transactionQueries: {
        type: TransactionQuery,
        resolve: TransactionQuery.resolve,
      },
      userQueries: {
        type: UserQuery,
        resolve: UserQuery.resolve,
      }
    }
  });

// Mutations - define actions like creating, updating, and deleting records
const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        categoryMutation: {
            type: CategoryMutation,
            resolve: CategoryMutation.resolve
        },
        commentMutation: {
            type: CommentMutation,
            resolve: CommentMutation.resolve  // Pointing to the resolve function of the commentMutation
        },
        notificationMutation: {
            type: NotificationMutation,
            resolve: NotificationMutation.resolve
        },
        requestMutation: {
            type: RequestMutation,
            resolve: RequestMutation.resolve
        },
        requirementMutation: {
            type: RequirementMutation,
            resolve: RequirementMutation.resolve
        },
        sceneMutation: {
            type: SceneMutation,
            resolve: SceneMutation.resolve
        },
        tagMutation: {
            type: TagMutation,
            resolve: TagMutation.resolve
        },
        transactionMutation: {
            type: TransactionMutation,
            resolve: TransactionMutation.resolve
        },
        userMutation: {
            type: UserMutation,
            resolve: UserMutation.resolve
        }
    }
});

// Create the schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

module.exports = schema;
