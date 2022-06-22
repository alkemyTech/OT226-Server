const endpointResponse = ({
  res, code = 200, status = true, message, body, options,
}) => {
  res.status(code).json({
    code,
    status,
    message,
    body,
    options,
  })
}

module.exports = {
  endpointResponse,
}
