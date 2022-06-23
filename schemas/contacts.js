exports.contacts = {
  name: {
    exists: {
      errorMessage: 'Name does not Exist',
    },
    notEmpty: {
      errorMessage: 'Name is empty',
    },
  },
  phone: {
    exists: {
      errorMessage: 'phone does not Exist',
    },
    notEmpty: {
      errorMessage: 'phone is empty',
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
  message: {
    exists: {
      errorMessage: 'message does not Exist',
    },
    notEmpty: {
      errorMessage: 'message is empty',
    },
  },
}
