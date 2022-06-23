exports.contacts = {
  name: {
    exists: {
      errorMessage: 'Name does not Exist',
    },
    notEmpty: {
      errorMessage: 'Name is empty',
    },
  },
  email: {
    exists: {
      errorMessage: 'email does not Exist',
    },
    notEmpty: {
      errorMessage: 'email is empty',
    },
    isEmail: {
      msg: 'Add a valid email',
    },
  },
}
