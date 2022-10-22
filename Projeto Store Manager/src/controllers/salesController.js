const salesServices = require('../services/salesServices');

  const controllerSalesAll = async (_req, res) => {
    const { message } = await salesServices.serviceSalesAll();
    return res.status(200).json(message);
};

  const controllerSalesById = async (req, res) => {
    const { id } = req.params;

    const result = await salesServices.serviceSalesById(id);

    if (result.status === 404) {
      return res.status(result.status).json({ message: result.message });    
    }
     return res.status(result.status).json(result.message);
  };

  const controllerDeleteSales = async (req, res) => {
    const { id } = req.params;
    const result = await salesServices.serviceDeleteSales(id);
    if (result.status === 404) {
      return res.status(result.status).json({ message: result.message });    
    }
    return res.status(result.status).json(result.message);
  };

module.exports = {
  controllerSalesAll,
  controllerSalesById,
  controllerDeleteSales,
};