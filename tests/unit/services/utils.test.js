const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Joi = require('joi');
const { runSchema } = require('../../../services/utils');

chai.use(chaiAsPromised);

describe('services/utils', () => {
  const schema = Joi.object();
  const fn = runSchema(schema);
  beforeEach(sinon.restore);
  describe('runSchema', () => {
    it('deve disparar um erro caso o Joi dispare um erro', () => {
      sinon.stub(schema, 'validateAsync').rejects();
      chai.expect(fn({})).to.eventually.be.rejected;
    })
    it('deve retornar um objeto tratado em caso de sucesso', () => {
      sinon.stub(schema, 'validateAsync').resolves({});
      chai.expect(fn({})).to.eventually.deep.equal({});
    })
  });
})