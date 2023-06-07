const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({include: [
        {model: Product,
        include: [ ProductImage]}
    ]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const cartProducts = await Cart.findAll({
        where: { userId },
        attributes: ['userId', 'productId', 'quantity'],
        raw: true
    });

    await Purchase.bulkCreate(cartProducts);
    await Cart.destroy({ where: { userId } });
    return res.json(cartProducts);
});

const remove = catchError(async(req, res) => {
    const {id} = req.params
    await Purchase.destroy({where: {id}})
    return res.sendStatus(204)
})

module.exports = {
    getAll,
    create,
    remove
}