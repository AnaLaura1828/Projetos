import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/Teams';
import { Response } from 'superagent';
import { returnTeam, returnTeamId } from './mocks/mockTeam';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test endpoint /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves( returnTeam as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Check if return all', async () => {
    chaiHttpResponse = await chai.request(app).post('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(returnTeam)
  });
  it('Check if return for Id', async () => {
    chaiHttpResponse = await chai.request(app).post('/teams/:id');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(returnTeamId)
  });
});
