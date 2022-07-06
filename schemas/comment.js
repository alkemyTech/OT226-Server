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
  user_id: {
    exists: {
      errorMessage: 'There must be a body',
    },
    notEmpty: {
      errorMessage: 'body is empty',
    },
    isInt: {
      errorMessage: 'The body must be a integer',
    },
  },
  news_id: {
    exists: {
      errorMessage: 'There must be a body',
    },
    notEmpty: {
      errorMessage: 'body is empty',
    },
    isInt: {
      errorMessage: 'The body must be a integer',
    },
  },
}
