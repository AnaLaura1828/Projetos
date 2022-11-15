const { categoriesService } = require('../services');
const { validateCategories } = require('../middleware');

const addCategories = async (req, res) => {
    const { error } = validateCategories.validate(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });

    const { type, message } = await categoriesService.addCategory(req.body);

    if (type) return res.status(type).json({ message });
    return res.status(201).json(message);
};

const getAllCategoryController = async (_req, res) => {
    const { type, message } = await categoriesService.getAllCategory();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
};

module.exports = { 
    addCategories,
    getAllCategoryController,
};