const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const db = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

chai.use(chaiAsPromised);

describe('models/productsModel', () => {
  beforeEach(sinon.restore)
  describe('get', () => {
    it('deve disparar um erro caso a consulta dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.get(0)).to.eventually.be.rejected;
    });

    it('deve retornar uma lista vazia caso a consulta não retorne nenhum produto', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.get(0)).to.eventually.be.undefined;
    });
    
    it('deve retornar um objeto caso a consulta retorne um produto', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(productsModel.get(0)).to.eventually.deep.equal({});
    });

  });
  });