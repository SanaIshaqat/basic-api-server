'use strict';

const { server } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/models/index');

// before any of the test create a connection
beforeAll(async () => {
  await db.sync();
});

// after all the tests are done
afterAll(async () => {
  await db.drop();
});

describe('Web server', () => {
  // Check if server is alive
  test('/alive works', async () => {

    const response = await mockRequest.get('/alive');
    expect(response.status).toBe(200);

  });

  // Check if 404 is handled 
  test('Should respond with 404 status on an invalid method', async () => {

    const response = await mockRequest.get('/foo');
    expect(response.status).toBe(404);

  });

  // Check if general error handling is working
  test('should respond with 500 on an error', async () => {

    const response = await mockRequest.get('/error');
    expect(response.status).toBe(500);
  });

  ////////Clothes////////

  // test if can create an item
  it('can add a item', async () => {

    const response = await mockRequest.post('/clothes').send({
      itemType: 'dress',
      itemColor: 'black'
    });

    expect(response.status).toBe(201);

  });

  // test if can read
  it('can get all items', async () => {

    const response = await mockRequest.get('/clothes');

    expect(response.status).toBe(200);

  });

  // test if can read one item
  it('can read one item', async () => {
    const response = await mockRequest.get('/clothes/1');

    expect(response.status).toBe(200);
  });

  // test if can update a item
  it('can update a record', async () => {
    const response = await mockRequest.put('/clothes/1');

    expect(response.status).toBe(201);
  });
  // test if can delete a item
  it('can delete a record', async () => {
    const response = await mockRequest.delete('/clothes/1');

    expect(response.status).toBe(204);
  });

//////Food Tests//////
it('can add a item', async () => {

    const response = await mockRequest.post('/food').send({
       foodName:"test",
      foodOrigin:"test"
      
    });
    expect(response.status).toBe(201);
  });

  // test if can read
  it('can get all items', async () => {

    const response = await mockRequest.get('/food');

    expect(response.status).toBe(200);

  });

  // test if can read one item
  it('can read one item', async () => {
    const response = await mockRequest.get('/food/1');

    expect(response.status).toBe(200);
  });

  // test if can update a item
  it('can update a record', async () => {
    const response = await mockRequest.put('/food/1');

    expect(response.status).toBe(201);
  });
  // test if can delete a item
  it('can delete a record', async () => {
    const response = await mockRequest.delete('/food/1');

    expect(response.status).toBe(204);
});

});