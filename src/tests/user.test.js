const request = require('supertest')
const app = require('../app')
require('../models')

let userId;
let token;

test('/POST User should be 201', async () => {
    const user = {
        firstName: 'Pedrito',
        lastName: 'El crack',
        email: 'pedritoelcrack69@gmail.com',
        password: 'pedrito123',
        phone: '3156228342'
    }
    const res = await request(app).post('/users').send(user)
    userId = res.body.id
    expect(res.status).toBe(201);
    
});

test('/POST User Login should be 200', async () => {
    const credentials = {
        email: 'pedritoelcrack69@gmail.com',
        password: 'pedrito123'
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('/GET User should be 200', async () => {
    const res = await request(app).get('/users').set('Authorization', 'Bearer '+token)
    expect(res.status).toBe(200);
});

test('/PUT User should be 200', async () => {
    const userUpdate = {
        lastName: 'El Crack'
    }
    const res = await request(app).put('/users/'+userId).set('Authorization', 'Bearer '+token).send(userUpdate)
    expect(res.status).toBe(200);
});

test('/DELETE User should be 204', async () => {
    const res = await request(app).delete('/users/'+userId).set('Authorization', 'Bearer '+token)
    expect(res.status).toBe(204);
});

