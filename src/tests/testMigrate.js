const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models/Cart');
require('../models/Purchase');
require('../models');

const main = async() => {
    try{
        await sequelize.sync();
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();