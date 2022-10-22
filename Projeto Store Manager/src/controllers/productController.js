const { productServices } = require('../services');

  const findAll = async (_req, res) => {
    const result = await productServices.serviceFindAll();
     return res.status(200).json(result.message);
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    const result = await productServices.serviceById(id);

    if (result.status === 404) {
      return res.status(result.status).json({ message: result.message });    
    }
     return res.status(result.status).json(result.message);
  };

const controllerInsert = async (req, res) => {
  const { name } = req.body;
  const { message } = await productServices.serviceInsert(name);

  if (!message) {
    return res.status(400).json({ message: 'Erro ao realizar o cadastro' });
  }
  res.status(201).json(message);
};
  
const controllerUpdate = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const obj = { id, name };
  const result = await productServices.upDataService(obj);

   if (result.status === 404) {
      return res.status(result.status).json({ message: result.message });    
    }
  return res.status(result.status).json(result.message);
};

const controllerDelete = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.deleteService(id);
  
  if (result.status === 404) {
    return res.status(result.status).json({ message: result.message });    
  }
  return res.status(result.status).json(result.message);
};

const controllerSearchName = async (req, res) => {
  const { q } = req.query;
  const result = await productServices.serviceForSearchName(q);
  return res.status(200).json(result);
};

  module.exports = {
    findAll,
    getById,
    controllerInsert,
    controllerUpdate,
    controllerDelete,
    controllerSearchName,
  };