exports.member = {
  name: {
    exists: {
      errorMessage: 'There should be a name',
    },
    notEmpty: {
      errorMessage: 'The name field cannot be empty',
    },
    isString: {
      errorMessage: 'The name field must be a text string',
    },
  },
}
