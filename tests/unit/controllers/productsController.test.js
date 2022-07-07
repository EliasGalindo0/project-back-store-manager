const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsController = require('../../../controllers/productsController');
const productsServices = require('../../../services/productsServices');

describe('controller/productsController', () => {
  beforeEach(sinon.restore);
  describe('listAllProducts', () => {

  });

  describe('listProductById', () => {

  });

  describe('addProduct', () => {
    it('deve disparar um erro caso o productService.validationBodyAdd também dispare', () => {
      sinon.stub(productsServices, 'validateBodyAdd').rejects();
      chai.expect(productsController.addProduct({}, {})).to.eventually.be.rejected;
    })

    it('deve disparar um erro caso o productServices.add também dispare', () => {
      sinon.stub(productsServices, 'validateBodyAdd').resolves();
      sinon.stub(productsServices, 'addProduct').rejects();
      chai.expect(productsController.addProduct({}, {})).to.eventually.be.rejected;
    })

    it('deve disparar um erro caso o productServices.get também dispare', () => {
      sinon.stub(productsServices, 'validateBodyAdd').resolves();
      sinon.stub(productsServices, 'addProduct').resolves();
      sinon.stub(productsServices, 'listProductById').rejects();
      chai.expect(productsController.addProduct({}, {})).to.eventually.be.rejected;
    })

    it('deve retornar res.status 201 e res.json', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns()
      };
      sinon.stub().returns(res);
      sinon.stub().returns();
      sinon.stub(productsServices, 'validateBodyAdd').resolves();
      sinon.stub(productsServices, 'addProduct').resolves();
      sinon.stub(productsServices, 'listProductById').resolves({ id: 1 });
      await productsController.addProduct({}, res)
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ id: 1 });
    })
  });
});