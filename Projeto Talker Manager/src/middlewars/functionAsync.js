const fs = require('fs').promises;
const path = require('path');

const paths = path.resolve(
  __dirname,
  '..',
  'talker.json',
);

async function readTalk() {
  try {
    const talkers = await fs.readFile(paths, 'utf8');
    return JSON.parse(talkers);
  } catch (err) {
    console.error(`Erro ao ler arquivo talker: ${err}`);
  }
}

async function writeTalkers(talkers) {
  try {
    await fs.writeFile(paths, JSON.stringify(talkers));
  } catch (err) {
    console.error(`Erro ao escrever arquivo talker: ${err}`);
  }
}

async function newTalkerId(newPerson) {
  try {
      const readlist = await readTalk();
      const talkerId = { id: readlist.length + 1, ...newPerson };
      const newTalkersList = JSON.stringify([...readlist, talkerId]);
      await fs.writeFile(paths, newTalkersList);
      return talkerId;
  } catch (error) {
      console.error(`I/O Error: ${error}`);
  }
}

async function editTalker(info, idTalker) {
  try {
    const readlist = await readTalk();
    const getId = readlist.findIndex(((elem) => elem.id === Number(idTalker)));
    const edited = { ...readlist[getId], ...info };
    readlist.splice(getId, 1, edited);
    await writeTalkers(readlist);
    return edited;
  } catch (err) {
    console.log(`Can not edit ${err}`);
  }
}

module.exports = { readTalk, writeTalkers, newTalkerId, editTalker };