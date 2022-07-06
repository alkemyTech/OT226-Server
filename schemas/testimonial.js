exports.putTestimonial = {
  id: {
    in: ['params'],
    isInt: {
      errorMessage: 'param id should be an integer',
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
  content: {
    in: ['body'],
    optional: {
      options: {
        checkFalsy: true,
      },
    },
    isString: {
      errorMessage: 'content should be a string',
    },
  },
}

exports.postTestimonial = {
  name: {
    isString: {
      errorMessage: 'name must be a string',
    },
  },
  content: {
    isString: {
      errorMessage: 'content must be a string',
    },
  },
}
