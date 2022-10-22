const salesModel = require('../models/salesModel');

const serviceSalesAll = async () => {
  const result = await salesModel.modelListAllSales();
  return { type: null, message: result };
};

const serviceSalesById = async (id) => {
  const result = await salesModel.modelSalesById(Number(id));
  if (result.length !== 0) { return { message: result, status: 200 }; } 
    return { message: 'Sale not found', status: 404 };
};

const serviceDeleteSales = async (id) => {
  const valitedSale = await salesModel.modelSalesById(id);

  if (valitedSale.length !== 0) {
    await salesModel.deleteModelSales(id);
    return { status: 204 };
  }
    return { message: 'Sale not found', status: 404 };
};

module.exports = {
  serviceSalesAll,
  serviceSalesById,
  serviceDeleteSales,
};