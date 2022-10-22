const productModel = require('../models');

  const serviceFindAll = async () => {
    const result = await productModel.modelFindAll();
    return { type: null, message: result }; 
  };

  const serviceById = async (id) => {
    const result = await productModel.modelById(id);
    if (result) { return { message: result, status: 200 }; }
    return { message: 'Product not found', status: 404 };
  };

const serviceInsert = async (name) => {
    const newProduct = await productModel.insertModel(name);
    const newProductId = await productModel.modelById(newProduct);

    return { message: newProductId };
  };

const upDataService = async (product) => {
  const { id } = product;

  const valited = await productModel.modelById(id);

  if (valited) {
    await productModel.updateModel(product);
    return { message: product, status: 200 };
  }
    return { message: 'Product not found', status: 404 };
};

const deleteService = async (id) => {
  const validation = await productModel.modelById(id);
  if (validation) {
    await productModel.deleteModel(id);
    return { status: 204 };
  }
    return { message: 'Product not found', status: 404 };
};

const serviceForSearchName = async (name) => {
  const findName = `%${name}%`;
  const result = await productModel.modelForSearchName(findName);
  return result;
};

  module.exports = {
    serviceFindAll,
    serviceById,
    serviceInsert,
    upDataService,
    deleteService,
    serviceForSearchName,
  };