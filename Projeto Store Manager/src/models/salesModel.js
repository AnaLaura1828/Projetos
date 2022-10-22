const connection = require('./db/connection');

const modelListAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT id AS 'saleId', date, product_id AS 'productId', quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id;`,
  );
  return result;
};

const modelSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT  date, product_id AS 'productId', quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id
    WHERE StoreManager.sales.id = ?
    ORDER BY productId ASC `, [id],
  );
  return result;
};

const deleteModelSales = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ? ', [id],
  );
  return result;
};

const registerSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (sales) VALUES(?)', [sales],
  );
  return insertId;
};

module.exports = {
  modelListAllSales,
  modelSalesById,
  deleteModelSales,
  registerSales,
};