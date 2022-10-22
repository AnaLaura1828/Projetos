const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/productModel');
const connection = require('../../../src/models/db/connection');
const {mockProducts, newProduct, mockAtualizada, mockEspefifica} = require('../mocks/product.mock');

describe('Model products', function () {
  describe('Verifica se lista todos os produtos', function () {
    it('Retorna um array com os elementos', async function () {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const result = await productModel.modelFindAll();

      expect(result).to.deep.equal(mockProducts);
    });
    it('Verifica se retorna o produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);

      const result = await productModel.modelById(1);

      expect(result).to.deep.equal(mockProducts[0]);
    });
    it('Verifica se cadastra produtos', async function () {

      sinon.stub(connection, 'execute').resolves([{ insertId: 4}]);
      const result = await productModel.insertModel(newProduct);
      expect(result).to.equal(4);
    })
    it('Verifica se atualiza um produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves(mockAtualizada);

      const result = await productModel.updateModel(mockAtualizada[0]);
      expect(result).to.be.equal(mockAtualizada[0])
    });
    it('Verifica se deleta um produto pelo id', async function () {
      sinon.stub(connection, 'execute').resolves(mockAtualizada);

      const result = await productModel.deleteModel(mockAtualizada[0]);
      expect(result).to.be.equal(mockAtualizada)
    });
    it('Verifica se o endpoint traz o product baseado no "q"', async function () {
      sinon.stub(connection, 'execute').resolves([mockEspefifica]);

      const result = await productModel.modelForSearchName("%traje%");
      expect(result).to.deep.equal(mockEspefifica);
    })
    afterEach(() => sinon.restore());
  });
});