const chai = require('chai');
const { expect } = require("chai");
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { allSales, mockAtualizadaSales } = require('../mocks/sales.mock');
const salesService = require('../../../src/services/salesServices');
const salesController = require('../../../src/controllers/salesController');

chai.use(sinonChai);

describe('Controller sales', function () {
  describe('lista os sales', function () {
    it('retorna os elementos', async function () {

      sinon.restore()
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'serviceSalesAll').resolves({type:null, message: allSales});
      await salesController.controllerSalesAll(req, res);

      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(allSales)
    });
    it('retorna erro pelo id inexistente', async function () {

      const res = {};
      const req = { params: { id: 13 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'serviceSalesById').resolves({ message: 'Sale not found', status: 404 });
      await salesController.controllerSalesById(req, res);

      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({message: 'Sale not found'});
    });
    it('retorna os elementos pelo id', async function () {

      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'serviceSalesById').resolves({message: allSales, status: 200} );
      await salesController.controllerSalesById(req, res);

      expect(res.status).to.have.been.calledOnceWith(200)
      expect(res.json).to.have.been.calledOnceWith(allSales);
    });
    it('Deleta a venda pelo id', async function () {
      
      const res = {};
      const req = { params: { id: 2 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
 
      sinon.stub(salesService, 'serviceDeleteSales').resolves(allSales);
      await salesController.controllerDeleteSales(req, res);

      expect(res.json).to.have.been.calledOnceWith(allSales.message);
    });
    it('Retorna erro ao tentar deletar a venda pelo id inválido', async function () {
      
      const res = {};
      const req = { params: { id: 289}};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
 
      sinon.stub(salesService, 'serviceDeleteSales').resolves({ message: 'Sale not found', status: 404 });
      await salesController.controllerDeleteSales(req, res);
      
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Sale not found'});
    })
  });
   afterEach(() => sinon.restore());
});