const express = require('express');
const { readTalk, newTalkerId, 
editTalker, writeTalkers } = require('../middlewars/functionAsync');
const valitedAgeTalk = require('../middlewars/valitedAgeTalk');
const valitedCampoTalk = require('../middlewars/valitedCampoTalk');
const valitedNameTalk = require('../middlewars/valitedNameTalk');
const valitedRateTalkId = require('../middlewars/valitedRateId');
const valitedRateTalk = require('../middlewars/valitedRateTalk');
const valitedToken = require('../middlewars/valitedToken');

const router = express.Router();

router.get('/search', valitedToken, async (req, res) => {
    const { q } = req.query;
    const readlist = await readTalk();
    const talkFilter = readlist.filter((elem) => elem.name.includes(q));
    console.log(readlist);
    res.status(200).json(talkFilter);
});

router.get('/', async (_req, res) => {
    const talk = await readTalk();
    res.status(200).json(talk);
  });

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkRead = await readTalk();
    const talker = talkRead.find((elem) => elem.id === Number(id));
    if (talker) {
        res.status(200).json(talker);
    } else {
        res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
});

router.post('/', 
valitedToken, 
valitedNameTalk,
valitedAgeTalk,
valitedCampoTalk,
valitedRateTalk,
async (req, res) => {
    const newreq = req.body;
    const newTalk = await newTalkerId(newreq);
    
    res.status(201).json(newTalk);
});

router.put('/:id', 
valitedToken, 
valitedNameTalk,
valitedAgeTalk,
valitedCampoTalk,
valitedRateTalkId,
async (req, res) => {
    const informations = req.body;
    const { id } = req.params;
    const edited = await editTalker(informations, id);
    res.status(200).json(edited);
});

router.delete('/:id', valitedToken, async (req, res) => {
    const { id } = req.params;
    const readlist = await readTalk();
    const talkerId = readlist.find((elem) => elem.id === Number(id));
    const edited = { ...readlist };
    if (talkerId) {
    const index = readlist.indexOf(talkerId);
    readlist.splice(index, 1, edited);
  }
    await writeTalkers(readlist);
    res.sendStatus(204);
});

module.exports = router;