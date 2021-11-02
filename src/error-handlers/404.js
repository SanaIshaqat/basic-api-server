function handle404(req, res, next) {

    const errorObject = {
      status: 404,
      message: 'Sorry, the page you requested was not found :('
    }
  
    res.status(404).json(errorObject);
  }
  
  module.exports = handle404;