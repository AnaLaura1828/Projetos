const chai = require('chai');
const { expect } = require("chai");
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { mockProducts, returnService, newProduct, invaled, mockAtualizada } = require('../mocks/product.mock');
const productService = require('../../../src/services/productService');
const productControler = require('../../../src/controllers/productController');

chai.use(sinonChai);

describe('Controller products', function () {
  describe('lista os produtos', function () {
    it('retorna os elementos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'serviceFindAll').resolves({ message: mockProducts });
      await productControler.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(mockProducts)
    });
    it('retorna erro pelo id inexistente', async function () {
      const res = {};
      const req = { params: { id: 12 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const mockService = { message: 'Product not found', status: 404 };

      sinon.stub(productService, 'serviceById').resolves(mockService);

      await productControler.getById(req, res);

      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnceWith({ message: 'Product not found' });
    });
    it('retorna os elementos pelo id', async function () {
      sinon.restore()
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'serviceById').resolves({message: mockProducts, status: 200});
      await productControler.getById(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledOnceWith(mockProducts);
    });
    it('Cadastrando uma nova pessoa passageira com sucesso', async function () {
      const res = {};
      const req = {
        body: newProduct,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'serviceInsert').resolves({ type: null, message: newProduct });

      await productControler.controllerInsert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
    it('Verifica mensagem de erro ao cadastrar uma pessoa com id inexistente', async function () {

      const res = {};
      const req = { params: { id: 500}, body: { name: "Martelo de Thor"} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'serviceInsert').resolves(mockProducts);
      await productControler.controllerInsert(req, res);

      expect(res.json).to.have.been.calledWith({ message: 'Erro ao realizar o cadastro' });
      expect(res.status).to.have.been.calledWith(400);
    });
    it('Verifica se a busca é feita com sucesso pelo name', async function () {
      
      const res = {};
      const req = { query: { q: "traje" } };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
      sinon.stub(productService, 'serviceForSearchName').resolves(mockAtualizada);
      await productControler.controllerSearchName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockAtualizada);
    })
  });
  describe('Delete products', function () {
    it('Deleta com sucesso o produto', async function () {
      sinon.restore();
      const res = {};
      const req = { params: { id: 2 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'deleteService').resolves(mockProducts);
      await productControler.controllerDelete(req, res);
      expect(res.json).to.have.been.calledOnceWith(mockAtualizada.message)
    });
  });
  afterEach(() => sinon.restore());
});