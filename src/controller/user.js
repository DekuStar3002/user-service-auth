const userService = require('../service/user');
const CustomError = require('../util/CutomError');
const createUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const newUser = await userService.createUser(username, password);
        res.status(201).json({
          data: {
            username: newUser.username
          }
        });
    } catch (error) {
        if(error instanceof CustomError){
            res.status(error.status).json({
                message: error.message
            });
          return;
        }
        res.status(500).json({
            message: error.message
        });
    }
}

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const token = await userService.loginUser(username, password);
    res.status(200).json({
      message: 'user successfully login',
      token: token
    });
  } catch (error) {
    if(error instanceof CustomError){
      res.status(error.status).json({
        error: error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
}

const validateUser = async (req, res) => {
  try {
    const token = req.headers.authoriztion;
    const valid = await userService.validateUser(token);
    res.status(200).json({
      user: valid
    });
  } catch (error) {
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error: error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = { createUser, loginUser, validateUser };