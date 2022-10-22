const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/db/connection');
const {mockProducts} = require('../mocks/product.mock');
const { allSales, mockAtualizadaSales } = require('../mocks/sales.mock');

describe('Model sales', function () {
  describe('Verifica se lista todas as vendas', function () {
    it('Retorna todas os sales', async function () {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const result = await salesModel.modelListAllSales();

      expect(result).to.deep.equal(mockProducts);
    });
    it('Verifica se retorna o sale pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([mockProducts[0]]);

      const id = 1;
      const result = await salesModel.modelSalesById(id);

      expect(result).to.deep.equal(mockProducts[0]);
    });
    it('Verifica se deleta o sale pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([mockProducts[0]]);

      const id = 1;
      const result = await salesModel.deleteModelSales(id);

      expect(result).to.deep.equal(mockProducts[0]);
    });
  });
  describe('Cadastrar vendas', function () {
    it('Verifica se as vendas são salvas na tabela sales', async function () {
      
      sinon.stub(connection, 'execute').resolves([{ insertId: 4}])
      const result = await salesModel.registerSales(allSales);
      expect(result).to.deep.equal(4);
    });
  });
  afterEach(() => sinon.restore());
});