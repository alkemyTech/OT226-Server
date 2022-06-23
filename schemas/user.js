<<<<<<< HEAD
exports.userRegisterSchema = {
=======
exports.user = {
>>>>>>> 213c84dc73e9336683e68ab02fd4593650d4c1a1
  firstName: {
    exists: {
      errorMessage: 'User name is required',
      options: { checkFalsy: true },
    },
<<<<<<< HEAD
    isString: { errorMessage: 'User name should be string' },
=======
    isString: { errorMessage: 'User name should be a string' },
>>>>>>> 213c84dc73e9336683e68ab02fd4593650d4c1a1
  },
  lastName: {
    exists: {
      errorMessage: 'User name is required',
      options: { checkFalsy: true },
    },
<<<<<<< HEAD
    isString: { errorMessage: 'User name should be string' },
  },
  password: {
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'password should be string' },
    isLength: {
      options: { min: 5 },
      errorMessage: 'Password should be at least 5 characters',
=======
    isString: { errorMessage: 'Last name should be a string' },
  },
  password: {
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'Password should be a string' },
    isStrongPassword: {
      errorMessage:
        'Password should be at least 8 characters and contain uppercase letters, lowercase letters, numbers and special characters',
>>>>>>> 213c84dc73e9336683e68ab02fd4593650d4c1a1
    },
  },
  email: {
    isEmail: { errorMessage: 'Please provide valid email' },
  },
}
