const jwt = require('jsonwebtoken');

const validateToken = (token) => {
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET);

        return data;
    } catch (error) {
        const e = new Error('Token inválido');
        e.name = 'Não válido';
        throw e;
    }
};

module.exports = { validateToken };