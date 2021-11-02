'use strict';
const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Validator Test', () => {

  // Check if /person endpoint works and found name query

  test('/person 200 if the name is in the query string', async () => {
    const response = await mockRequest.get('/person?name=sana');
    expect(response.status).toBe(200);
  });
   // Check if /person endpoint works name value equal to existing query
  test('/person 200 if the name value matches query string', async () => {
    const response = await mockRequest.get('/person?name=sana');
    expect(response.body.name).toEqual('sana');

  });

  // Check if validator found name key

  test('/person 500 if no name in the query string', async () => {
    const response = await mockRequest.get('/person?name');
    expect(response.status).toBe(500);
  });

});