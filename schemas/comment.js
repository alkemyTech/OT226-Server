exports.comment = {
  body: {
    exists: {
      errorMessage: 'There must be a body',
    },
    notEmpty: {
      errorMessage: 'body is empty',
    },
    isString: {
      errorMessage: 'The body must be a string',
    },
  },
  userId: {
    exists: {
      errorMessage: 'There must be a user_id',
    },
    notEmpty: {
      errorMessage: 'user_id is empty',
    },
    isInt: {
      errorMessage: 'The user_id must be a integer',
    },
  },
  newsId: {
    exists: {
      errorMessage: 'There must be a news_id',
    },
    notEmpty: {
      errorMessage: 'news_id is empty',
    },
    isInt: {
      errorMessage: 'The news_id must be a integer',
    },
  },
}
