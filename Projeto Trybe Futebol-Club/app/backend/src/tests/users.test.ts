import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
// import { after, before } from 'node:test';

import App from '../app';
import Users from '../database/models/users';
import  {returnUser}  from './mocks/mockUsers'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test endpoint /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(returnUser as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Check if you login correctly', async () => {
    chaiHttpResponse = await chai.request(app).post('/login');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(returnUser)
  });
});
