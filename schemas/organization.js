exports.putOrganization = {
  id: {
    in: ['params'],
    isInt: {
      errorMessage: 'param id should be an integer',
    },
    toInt: true,
  },
  image: {
    in: ['body'],
    optional: {
      options: {
        checkFalsy: true,
      },
    },
    isString: {
      errorMessage: 'image should be a string',
    },
  },
  address: {
    in: ['body'],
    optional: {
      options: {
        checkFalsy: true,
      },
    },
    isString: {
      errorMessage: 'address should be a string',
    },
  },
  phone: {
    in: ['body'],
    optional: {
      options: {
        checkFalsy: true,
      },
    },
    isInt: {
      errorMessage: 'phone should be an integer',
    },
    toInt: true,
  },
  name: {
    in: ['body'],
    optional: {
      options: {
        checkFalsy: true,
      },
    },
    isString: {
      errorMessage: 'name should be a string',
    },
  },
}
