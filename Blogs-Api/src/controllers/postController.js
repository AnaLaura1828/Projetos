const { postService } = require('../services');

const getControllerAll = async (_req, res) => {
    const { type, message } = await postService.getPostAll();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
};

const getPostIdController = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await postService.getPostId(id);

    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
};

module.exports = {
    getControllerAll,
    getPostIdController,
};