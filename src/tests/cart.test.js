const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models');

let cartId;
let token;

beforeAll(async () => {
    const credentials = {
        email: "manzanera1511@gmail.com",
        password: "xd123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})-

test('POST /cart should be 200', async () => {
      const product = await Product.create( {
        title: "Iphone X",
        description:
          "Celular de alta calidad con una pantalla grande y tecnología LED.",
        brand: "Apple",
        price: 300,
      });
    
    const cart = {
        productId:product.id,
        quantity: 1
    };

    const res = await request(app).post('/cart').set('Authorization', `Bearer ${token}`).send(cart);

    cartId = res.body.id;
    await product.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /cart should be 200', async () => {
    const res = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});


test('PUT /cart/:id should be 200', async () => {
    const cartUpdate = {
        quantity: 2
    };
    const res = await request(app).put(`/cart/${cartId}`).set('Authorization', `Bearer ${token}`).send(cartUpdate);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cartUpdate.quantity);
});

test('DELETE /cart/:id should be 204', async () => {
    const res = await request(app).delete(`/cart/${cartId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});