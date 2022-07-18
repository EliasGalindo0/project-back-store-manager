const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const salesController = require('../../../controllers/salesController');
const salesServices = require('../../../services/salesService');
const { makeRes } = require('./utils');




describe('controller/salessController', () => {
  beforeEach(sinon.restore);
  describe('get', () => {
    it('deve disparar um erro caso o salesServices.list também dispare', () => {
      sinon.stub(salesServices, 'get').rejects();
      chai.expect(salesController.get({}, {})).to.eventually.be.rejected;
    })

    it('deve retornar res.status 200 e res.json', async () => {
      const res = makeRes();
      sinon.stub(salesServices, 'get').resolves([]);
      await salesController.get([], res)
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
    })
  });

  describe('getById', () => {
    it('deve disparar um erro caso o salesServices.listById também dispare', () => {
      sinon.stub(salesServices, 'getById').rejects();
      chai.expect(salesController.getById({})).to.eventually.be.rejected;
    })
    it('deve retornar um produto caso a consulta de certo', () => {
      sinon.stub(salesServices, 'getById').resolves();
      chai.expect(salesController.getById({})).to.eventually.be.rejected;
    })
    // it('deve retornar res.status 200 e res.json', async () => {
    //   const res = makeRes();
    //   sinon.stub().returns(res);
    //   sinon.stub().returns();
    //   sinon.stub(salesController, 'getById').resolves([]);
    //   await salesController.getById({}, res)
    //   chai.expect(res.status.getCall(0).args[0]).to.equal(200);
    // })

  });

  describe('add', () => {
    it('deve disparar um erro caso o productService.validationBodyAdd também dispare', () => {
      chai.expect(salesController.add({}, {})).to.eventually.be.rejected;
    })

    it('deve disparar um erro caso o salesServices.add também dispare', () => {
      sinon.stub(salesServices, 'create').rejects();
      chai.expect(salesController.add({}, {})).to.eventually.be.rejected;
    })

    it('deve disparar um erro caso o salesServices.get também dispare', () => {
      sinon.stub(salesServices, 'create').resolves();
      sinon.stub(salesServices, 'getById').rejects();
      chai.expect(salesController.add({}, {})).to.eventually.be.rejected;
    })

    it('deve retornar res.status 201 e res.json', async () => {
      const res = makeRes();
      sinon.stub().returns(res);
      sinon.stub().returns();
      sinon.stub(salesServices, 'create').resolves();
      sinon.stub(salesServices, 'getById').resolves({ id: 1 });
      await salesController.add({}, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      // chai.expect(res.json.getCall(0).args[0]).to.equal(1);
    })
  });
});