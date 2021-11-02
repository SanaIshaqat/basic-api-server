'use strict';

const express = require('express');

const { Food } = require('../models/index');

const foodRouter = express.Router();


// RESTful Route Delectation 
foodRouter.get('/food', getfood); // get all the food form the Db
foodRouter.get('/food/:id', getOneItem); // gets an item by ID
foodRouter.post('/food', createItem); // creating a new item
foodRouter.put('/food/:id', updateItem); // updating an item by their ID
foodRouter.delete('/food/:id', deleteItem); // deleting an item by their ID


async function getfood(req, res) {

  const allFood = await Food.findAll();
  res.status(200).json(allFood);

}

async function getOneItem(req, res) {
  const id = parseInt(req.params.id); 
  const item = await Food.findOne({
    where: {
      id: id
    }
  });
  res.status(200).json(item);
}

async function createItem(req, res) {
  const obj = req.body;
  let item = await Food.create(obj);
  res.status(201).json(item);

}

async function updateItem(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let foundFood = await Food.findOne({ where: { id: id } });
  const updatedItem = await foundFood.update(obj);
  res.status(201).json(updatedItem);
}

async function deleteItem(req, res) {
  const id = parseInt(req.params.id);
  const deleteItem = await Food.destroy({ where: { id } });
  res.status(204).json(deleteItem);
}


module.exports = foodRouter;