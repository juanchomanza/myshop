const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImage = sequelize.define('productImage', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    }
    // productId
});

module.exports = ProductImage;