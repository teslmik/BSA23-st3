const responseMiddleware = (_, res, next) => {
  // TODO: Implement middleware that returns result of the query

  if (res?.errors === '404') {
    res.status(404).json({
      error: true,
      message: res.message
    });
  } else if (res?.errors === '400') {
    res.status(400).json({
      error: true,
      message: res.message
    });
  } else if (!res.errors) {
    res.status(200).json(res.data);
  }

  next();
};

export { responseMiddleware };
