'use strict';

const express = require('express');

const { Clothes} = require('../models/index');

const clothesRouter = express.Router();


// RESTful Route Delectation 
clothesRouter.get('/clothes', getClothes); // get all the clothes form the Db
clothesRouter.get('/clothes/:id', getOneItem); // gets an item by ID
clothesRouter.post('/clothes', createItem); // creating a new item
clothesRouter.put('/clothes/:id', updateItem); // updating an item by their ID
clothesRouter.delete('/clothes/:id', deleteItem); // deleting an item by their ID


async function getClothes(req, res) {

  const allClothes = await Clothes.findAll();
  res.status(200).json(allClothes);

}

async function getOneItem(req, res) {
  const id = parseInt(req.params.id); // we parse the ID in case it was a string
  const item = await Clothes.findOne({
    where: {
      id: id
    }
  });
  res.status(200).json(item);
}

async function createItem(req, res) {
  const obj = req.body;
  let item = await Clothes.create(obj);
  res.status(201).json(item);

}

async function updateItem(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let foundClothes = await Clothes.findOne({ where: { id: id } });
  const updatedItem = await foundClothes.update(obj);
  res.status(201).json(updatedItem);
}

async function deleteItem(req, res) {
  const id = parseInt(req.params.id);
  const deleteItem = await Clothes.destroy({ where: { id } });
  res.status(204).json(deleteItem);
}


module.exports = clothesRouter;