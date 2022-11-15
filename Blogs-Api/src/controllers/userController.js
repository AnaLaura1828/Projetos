const { userService } = require('../services');
const { validateUser } = require('../middleware');

const createUser = async (req, res) => {
    const { error } = validateUser.validate(req.body);
    
    if (error) return res.status(400).json({ message: error.details[0].message });
    
    const { type, message } = await userService.createUser(req.body);

    if (type) return res.status(type).json({ message });

    return res.status(201).json({ token: message });
};

const getAll = async (_req, res) => {
    const { type, message } = await userService.getAll();
    if (type) return res.status(type).json({ message });
     return res.status(200).json(message);
};

const getByIds = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await userService.getById(id);

    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
};
module.exports = {
     createUser,
     getAll,
     getByIds,
    };