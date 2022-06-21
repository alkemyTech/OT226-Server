exports.userRegisterSchema = {
  userName: {
    exists: {
      errorMessage: 'User name is required',
      options: { checkFalsy: true },
    },
    isString: { errorMessage: 'User name should be string' },
  },
  password: {
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'password should be string' },
    isLength: {
      options: { min: 5 },
      errorMessage: 'Password should be at least 5 characters',
    },
  },
  email: {
    isEmail: { errorMessage: 'Please provide valid email' },
  },
}
