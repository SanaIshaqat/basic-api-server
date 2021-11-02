'use strict';

function validator(req, res, next) {
      if (req.query.name) {
        // call next so that the function in the next line can do its work 
        next();
      } else {
        next('An error Happened!');
      }
    
    }
    module.exports = validator;