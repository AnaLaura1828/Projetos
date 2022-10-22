const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require('../../../src/models');
const { productServices } = require("../../../src/services");
const {serviceFindAll} = require('../../../src/services/productService');
const {mockProducts, invaled, newProduct, mockAtualizada, mockEspefifica} = require('../mocks/product.mock')

describe("Service products", function () {
  describe("Verifica os produtcs", function () {
    it("Retorna os products", async function () {
      sinon.stub(productModel, 'modelFindAll').resolves(mockProducts);
      
      const result = await serviceFindAll();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mockProducts);
    });

    it('Mostra o produto pelo id', async function () {
      sinon.stub(productModel, 'modelById').resolves(mockProducts[0]);

      const result = await productModel.modelById(1);

      expect(result).to.deep.equal(mockProducts[0]);
    });

    it("Falha se não existir id", async function () {
      sinon.stub(productModel, "modelById").resolves(undefined);

      const result = await productServices.serviceById(invaled);

      expect(result.message).to.equal('Product not found');
    });
    it('Retorna id da pessoa cadastrada', async function () {
      sinon.stub(productModel, 'insertModel').resolves([{ insertId: 4 }]);
      sinon.stub(productModel, 'modelById').resolves(newProduct);
      
      const result = await productServices.serviceInsert("Martelo do Capitão");

      expect(result.type).to.equal(undefined);
      expect(result.message).to.deep.equal(newProduct);
    });
    it('Retorna a busca pelo name', async function () {
      sinon.stub(productModel, 'modelForSearchName').resolves(mockEspefifica);

      const result = await productServices.serviceForSearchName('%traje%');
      expect(result).to.deep.equal(mockEspefifica);
    })
  });
  describe('Fazendo UPDATE de products', function () {
    it('verifica se atualiza o product pelo id', async function () {

      sinon.stub(productModel, 'modelById').resolves(mockProducts);
      sinon.stub(productModel, "updateModel").resolves(mockAtualizada[0]);

      const product = { "id": 2, "name": "Martelo do Capitão" };

      const result = await productServices.upDataService(product);

      expect(result.message).to.be.deep.equal(product)
    });
    it('verifica se não atualiza o product se não encontrar o id', async function () {
  
      sinon.stub(productModel, 'insertModel').resolves(mockAtualizada);
      const product = { "id": 22, "name": "Martelo do Capitão" }
      const result = await productServices.upDataService(product);
      expect(result.message).to.be.equal('Product not found')
    });
  });
  describe('Delete um product', function () {
    it('verifica se apaga um product pelo id', async function () {
      
      sinon.stub(productModel, 'modelById').resolves(mockProducts);
      sinon.stub(productModel, 'deleteModel').resolves(mockAtualizada);

      const id = 2;
      const result = await productServices.deleteService(id);
      
      expect(result).to.be.deep.equal({ status: 204 });
    });
     it('verifica mensagem de erro ao deletar um product pelo id inválido', async function () {
      
      sinon.stub(productModel, 'modelById').resolves(undefined);
      sinon.stub(productModel, 'deleteModel').resolves(invaled);

      const id = 222;
      const result = await productServices.deleteService(id);
      
       expect(result.message).to.be.equal('Product not found');
       expect(result.status).to.be.deep.equal(404);
    });
  });
  afterEach(sinon.restore);
});