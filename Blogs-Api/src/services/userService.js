const jwt = require('jsonwebtoken');

const { User } = require('../models');

const createUser = async (body) => {
    const [row, created] = await User.findOrCreate({
      where: { email: body.email },
      defaults: body,
    });

    if (!created) return { type: 409, message: 'User already registered' };
    const jwtConfig = { expiresIn: '1d', algorithm: 'HS256',
      };
      const info = { email: row.dataValues.email,
displayName: row.dataValues.displayName, 
        image: row.dataValues.image };

    const token = jwt.sign(info, 
    process.env.JWT_SECRET, jwtConfig);

    return { type: null, message: token };
};

// req 5
const getAll = async () => { 
  const allUsers = await User.findAll({
     attributes: { exclude: 'password' },
  });
  return { type: null, message: allUsers };
};

// req 6
const getById = async (id) => {
  const idUser = await User.findOne({
    where: { id },
    attributes: { exclude: 'password' },
  });

  if (!idUser) {
      return { type: 404, message: 'User does not exist' };
  }
  return { type: null, message: idUser };
};

module.exports = {
  createUser,
  getAll,
  getById,
};