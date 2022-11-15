const { Category } = require('../models');

const addCategory = async (body) => {
    try {
    const response = await Category.create(body);
    return { type: null, message: response };
    } catch (error) {
        return { type: 500, message: 'Something went wrong' };
    }
};

const getAllCategory = async () => {
    try {
    const allCategories = await Category.findAll();
    return { type: null, message: allCategories };
    } catch (error) {    
        return { type: 500, message: 'Something went wrong' };
    }
};
module.exports = {
    addCategory,
    getAllCategory,
};