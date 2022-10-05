function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.log('error', error);
      next(error);
    }
  }
}

module.exports = {
  asyncMiddleware
};
