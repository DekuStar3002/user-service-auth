const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');
const { SALT_ROUNDS, SECRET } = require('../constant');
const CustomError = require('../util/CutomError');
const redisUtil = require('../util/redisUtil');
const createUser = async (username, password) => {
    const user = await User.findOne({ where: { username: username } });
    if(user) {
        throw new CustomError(400, "User Already Present");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return User.create({ username: username, password: hashedPassword });
}

const loginUser = async (username, password) => {
    const user = await User.findOne({ where: { username: username } });
    if(!user) {
        throw new CustomError(400, 'User not found');
    }
    const login = await bcrypt.compare(password, user.password);
    if(!login) {
        throw new CustomError(401, 'Incorrect Password');
    }
    const token = jwt.sign({ id: user.id, user: user.username }, SECRET);
    await redisUtil.set(token);
    return token;
}

const validateUser = async (token) => {
    return jwt.verify(token, SECRET, async (error, decoded) => {
        if(error || !decoded) 
            throw new CustomError(401, 'Unauthorize User');
        const redisToken = await redisUtil.get();
        if(redisToken !== token)
            throw new CustomError(401, 'Unauthorize User');
        return decoded;
    })
}

module.exports = { createUser, loginUser, validateUser };