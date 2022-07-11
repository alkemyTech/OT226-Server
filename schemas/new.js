exports.news = {
  name: {
    exists: {
      errorMessage: 'Name does not Exist',
    },
    notEmpty: {
      errorMessage: 'Name is empty',
    },
  },
  content: {
    exists: {
      errorMessage: 'Content does not Exist',
    },
    notEmpty: {
      errorMessage: 'Content is empty',
    },
  },
  image: {
    exists: {
      errorMessage: 'Image does not Exist',
    },
    notEmpty: {
      errorMessage: 'Image is empty',
    },
  },
  categoryId: {
    exists: {
      errorMessage: 'CategoryId does not Exist',
    },
    notEmpty: {
      errorMessage: 'CategoryId is empty',
    },
  },
}

exports.idNews = {
  id: {
    exists: {
      errorMessage: 'There must be a id',
    },
    notEmpty: {
      errorMessage: 'id is empty',
    },
    isInt: {
      errorMessage: 'The id must be a integer',
    },
  },
}
