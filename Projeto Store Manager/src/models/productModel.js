const connection = require('./db/connection');

const modelFindAll = async () => {
  const [result] = await connection.execute(
   'SELECT * FROM StoreManager.products',
  );
  return result;
};

const modelById = async (id) => {
    const [[result]] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?', [id],
    );
    return result;
};

const insertModel = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES(?)', [productName],
  );
    return insertId;
};

const updateModel = async (product) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ? ',
    [product.name, product.id],
  );
  return result;
};

const deleteModel = async (id) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ? ', [id],
  );
  return result;
};

const modelForSearchName = async (query) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?', [query],
  );
  return result;
};

module.exports = {
  modelFindAll,
  modelById,
  insertModel,
  updateModel,
  deleteModel,
  modelForSearchName,
};