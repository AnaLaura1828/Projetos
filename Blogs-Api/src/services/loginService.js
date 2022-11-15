const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async ({ email, password }) => {
  try {
  const dados = await User.findOne({
    where: { email, password },
  });

  if (!dados) return { type: 400, message: 'Invalid fields' };

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, jwtConfig);
  return { type: null, message: token };
  } catch (error) {
  return { type: 500, message: 'Something went wrong' };
  }
};

module.exports = {
  login,
};