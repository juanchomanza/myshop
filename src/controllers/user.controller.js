const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10)
    const result = await User.create({...req.body, password: hashed});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    delete req.body.password
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req,res) => {
    const {password, email} = req.body;
    const user = await User.findOne({where: {email}})
    if(!user) return res.status(404).json({message: 'Invalid Credentials'})
    const verifyPassword = await bcrypt.compare(password, user.password)
    if(!verifyPassword) return res.status(404).json({message: 'Invalid Credentials'})
    const token = jwt.sign({user}, process.env.TOKEN_SECRET, {expiresIn: '1d'})
    return res.json({token: token})
})

const me = catchError(async(req,res) => {
    const user = req.user
    return res.json(user)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    me
}