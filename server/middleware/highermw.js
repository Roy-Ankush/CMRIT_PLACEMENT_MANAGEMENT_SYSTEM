const higherOrderMiddleware = (middleware1, middleware2) => {
    return async (req, res, next) => {
      middleware1(req, res, async (err) => {
        if (err) {
          return next(err);
        }
        await middleware2(req, res, next);
      });
    };
  };
  
  export default higherOrderMiddleware;
  