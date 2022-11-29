import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/Teams';
import { Response } from 'superagent';
import { returnId, returnMatches } from './mocks/mockMatches';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test endpoint /matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves( returnMatches as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Check if return all', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(returnMatches)
  });
  it('Check if return for Id', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(returnId)
  });
});
