const { loginService } = require('../services');
const middleware = require('../middleware/validateLogin');

const login = async (req, res) => {
  const { error } = middleware.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { type, message } = await loginService.login(req.body);

  if (type) return res.status(type).json({ message });
  res.status(200).json({ token: message });
};

module.exports = {
  login,
};