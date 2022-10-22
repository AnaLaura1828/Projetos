const express = require('express');
const { readTalk } = require('../middlewars/functionAsync');
const valitedEmail = require('../middlewars/valitedEmail');
const valitedSenha = require('../middlewars/valitedSenha');
const generateToken = require('../utils/token');

const router = express.Router();

router.post('/', valitedSenha, valitedEmail, async (req, res) => {
    const talkRead = await readTalk();
    const logins = req.body;
    talkRead.push(logins);
    const token = generateToken();
    return res.status(200).json({ token });
});

module.exports = router;