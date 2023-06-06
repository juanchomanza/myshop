const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImage = require("../models/ProductImage");
require("../models");

let productId;
let token;

beforeAll(async () => {
  const credentials = {
    email: "manzanera1511@gmail.com",
    password: "xd123",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /products should be 201", async () => {
  const category = await Category.create({
    name: "Tech",
  });
  const product = {
    title: "Iphone X",
    description:
      "Celular de alta calidad con una pantalla grande y tecnología LED.",
    brand: "Apple",
    price: 300,
    categoryId: category.id,
  };
  const res = await request(app)
    .post("/products")
    .set("Authorization", `Bearer ${token}`)
    .send(product);
  productId = res.body.id;
  await category.destroy();
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
});

test("GET /products should be 200", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
});

test("POST /products/:id/images should set the product images", async () => {
  const image = await ProductImage.create({
    url: "https://img2.rtve.es/i/ctv-oqt-pepa-pig-mismo-sexo_1662628532018.png",
    publicId: "false id",
  });
  const res = await request(app)
    .post(`/products/${productId}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
});

test("GET /products/:id should be 200", async () => {
  const res = await request(app).get(`/products/${productId}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(productId);
});

test("PUT /products/:id should be 200", async () => {
  const category = await Category.create({
    name: "Technology",
  });
  const product = {
    title: "iPhone 11",
    description:
      "Televisor de alta calidad con una pantalla grande y tecnología LED. Ofrece una experiencia de visualización inmersiva con colores vibrantes y una resolución nítida.",
    brand: "Samsung",
    price: 400,
    categoryId: category.id,
  };
  const res = await request(app)
    .put(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(product);
  await category.destroy();
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(product.title);
});

test("DELETE /products should be 204", async () => {
  const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
