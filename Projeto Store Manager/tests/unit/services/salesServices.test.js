const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require('../../../src/models/salesModel')
const salesServices = require('../../../src/services/salesServices')
const {mockProducts} = require('../mocks/product.mock');
const { allSales, mockAtualizadaSales, invaledSale } = require("../mocks/sales.mock");

describe("Service sales", function () {
  describe("Verifica as vendas", function () {
    it("Retorna todos os sales", async function () {
      sinon.stub(salesModel, 'modelListAllSales').resolves(mockProducts);
      
      const result = await salesServices.serviceSalesAll();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mockProducts);
    });
    it('Mostra o sale pelo id', async function () {
      sinon.stub(salesModel, 'modelSalesById').resolves(allSales[0]);
      const id = 1;
      const result = await salesServices.serviceSalesById(id);

      expect(result.message).to.deep.equal(allSales[0]);
    });
  });
    describe('Delete Sale', function () {
      it('Verifica se deleta o sale pelo id', async function () {
  
        sinon.stub(salesModel, 'modelSalesById').resolves(allSales);
        sinon.stub(salesModel, 'deleteModelSales').resolves(allSales);
  
        const id = 2;
        const result = await salesServices.serviceDeleteSales(id);
  
        expect(result).to.be.deep.equal({ status: 204 })
      });
      it('Retorna erro em caso de querer deletar id invalido', async function () {
        
        sinon.stub(salesModel, 'modelSalesById').resolves([]);
        sinon.stub(salesModel, 'deleteModelSales').resolves(allSales);
  
        const id = 15;
        const result = await salesServices.serviceDeleteSales(id);
  
        expect(result.message).to.be.equal('Sale not found');
        expect(result.status).to.be.deep.equal(404);
      })
  });
  afterEach(sinon.restore);
});