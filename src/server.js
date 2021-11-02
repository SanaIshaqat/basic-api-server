'use strict';

const express = require('express');
require('dotenv').config();
const app = express();

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const validator=require('./middleware/validator');
const clothesRouter=require('./routes/clothes.route');
const foodRouter=require('./routes/food.route')
const PORT = process.env.PORT || 3030;

///////////////////////////////////////////////
app.get('/alive', (req, res) => {
  res.status(200).send(' All is good and alive! ');
});

app.put('/hello', (req, res) => {
  res.status(200).send(' This is a put request!');
});

  app.get('/person',validator,(req, res,next) => {
      
    const output =req.query.name;  
    
    res.status(200).json({name:output});
  });

app.get('/error', (req, res, next) => {
  // next('You have encountered an Error !');
  throw new Error('You have encountered an Error !');
});
///////////////////////////////////////////////
//global middleware

app.use(logger);
app.use(express.json());

// to make our people routers usable, use the route with express
app.use(clothesRouter);
app.use(foodRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}

module.exports = {
  server: app,
  start: start
}