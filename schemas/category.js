exports.category = {
  name: {
    exists: {
      errorMessage: 'There must be a name',
    },
    notEmpty: {
      errorMessage: 'Name is empty',
    },
    isString: {
      errorMessage: 'The name must be a string',
    },
  },
}
