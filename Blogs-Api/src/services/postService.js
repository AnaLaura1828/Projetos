const { BlogPost, User, Category } = require('../models');

const getPostAll = async () => {
    try {
    const response = await BlogPost.findAll({
        include: [
         { model: User, as: 'user', attributes: { exclude: 'password' } },
         { model: Category, as: 'categories' },
        ],
    });
    return { type: null, message: response };
} catch (error) {
    return { type: 500, message: 'Something went wrong' };
    }
};

const getPostId = async (id) => {
    try {
        const postId = await BlogPost.findOne({
            where: { id },
            include: [
                { model: User, as: 'user', attributes: { exclude: 'password' } },
                { model: Category, as: 'categories' },
            ],
        });
        if (!postId) return { type: 404, message: 'Post does not exist' };
        return { type: null, message: postId };
    } catch (error) {
        return { type: 500, message: 'Something went wrong' };
    }
};

module.exports = {
    getPostAll,
    getPostId,
};