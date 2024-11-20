const categoryResolvers = require('./resolvers/CategoryResolvers.js');
const commentResolvers = require('./resolvers/CommentResolvers.js');
const notificationResolvers = require('./resolvers/NotifcationResolvers.js');
const requestResolvers = require('./resolvers/RequestResolvers.js');
const requirementResolvers = require('./resolvers/RequirementResolvers.js');
const sceneResolvers = require('./resolvers/SceneResolvers.js');
const tagResolvers = require('./resolvers/TagResolvers.js');
const transactionResolvers = require('./resolvers/TransactionResolvers.js');
const userResolvers = require('./resolvers/UserResolvers.js');

const resolvers = {
    Query: {
        usersFindAll: userResolvers.usersFindAll,
        userFindOne: userResolvers.userFindOne,
        categoryFindAll: categoryResolvers.categoryFindAll,
        categoryFindOne: categoryResolvers.categoryFindOne,
        commentFindOne: commentResolvers.commentFindOne,
        commentsFindAll: commentResolvers.commentsFindAll,
        notificationsFindAll: notificationResolvers.notificationsFindAll,
        notificationFindOne: notificationResolvers.notificationFindOne,
        requestsFindAll: requestResolvers.requestsFindAll,
        requestFindOne: requestResolvers.requestFindOne,
        requirementsFindAll: requirementResolvers.requirementsFindAll,
        requirementFindOne: requirementResolvers.requirementFindOne,
        scenesFindAll: sceneResolvers.scenesFindAll,
        sceneFindOne: sceneResolvers.sceneFindOne,
        tagsFindAll: tagResolvers.tagsFindAll,
        tagFindOne: tagResolvers.tagFindOne,
        transactionsFindAll: transactionResolvers.transactionsFindAll,
        transactionFindOne: transactionResolvers.transactionFindOne
    },
    Mutation: {
        //Create Mutations
        categoryCreate: categoryResolvers.categoryCreate,
        commentCreate: commentResolvers.commentCreate,
        notificationCreate: notificationResolvers.notificationCreate,
        userCreate: userResolvers.userCreate,
        requestCreate: requestResolvers.requestCreate,
        requirementCreate: requirementResolvers.requirementCreate,
        sceneCreate: sceneResolvers.sceneCreate,
        tagCreate: tagResolvers.tagCreate,
        transactionCreate: transactionResolvers.transactionCreate,

        //Edit Mutations
        // categoryEdit: categoryResolvers.categoryEdit,
        // commentEdit: commentResolvers.commentEdit,
        // notificationEdit: notificationResolvers.notificationEdit,
        // requestEdit: requestResolvers.requestEdit,
        // requirementEdit: requirementResolvers.requirementEdit,
        // sceneEdit: sceneResolvers.sceneEdit,
        // tagEdit: tagResolvers.tagEdit,
        // transactionEdit: transactionResolvers.transactionEdit,
        userEdit: userResolvers.userEdit,

        //Delete Mutations
        // categoryDelete: categoryResolvers.categoryDelete,
        // commentDelete: commentResolvers.commentDelete,
        // notificationDelete: notificationResolvers.notificationDelete,
        // requestDelete: requestResolvers.requestDelete,
        // requirementDelete: requirementResolvers.requirementDelete,
        // sceneDelete: sceneResolvers.sceneDelete,
        // tagDelete: tagResolvers.tagDelete,
        // transactionDelete: transactionResolvers.transactionDelete,
        userDelete: userResolvers.userDelete
    }
};

module.exports = resolvers;
