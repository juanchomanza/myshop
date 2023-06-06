const { getAll, create, remove } = require('../controllers/productImages.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const prodImg = express.Router();

prodImg.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT , upload.single('image'), create);

prodImg.route('/:id')
    .delete(verifyJWT, remove)

module.exports = prodImg;