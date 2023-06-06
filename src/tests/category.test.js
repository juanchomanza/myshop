const request = require('supertest')
const app = require('../app')
require('../models')

let token;
let categoryId;

beforeAll(async () => {
    const credentials = {
        email: "manzanera1511@gmail.com",
        password: "xd123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})


test('/POST Category should be 201', async () => {
    const category = {
        name: "Tech"
    }
    const res = await request(app).post('/categories').set('Authorization', 'Bearer '+token).send(category)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    categoryId = res.body.id
});

test('GET /categories should be 200', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
});

test('/PUT Category should be 201', async () => {
    const category = {
        name: "Technology"
    }
    const res = await request(app).put('/categories/'+categoryId).set('Authorization', 'Bearer '+token).send(category)
    expect(res.status).toBe(200);
});

test('/DELETE Category should be 204', async () => {
    const res = await request(app).delete('/categories/'+categoryId).set('Authorization', 'Bearer '+token)
    expect(res.status).toBe(204);
});