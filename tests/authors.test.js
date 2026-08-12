const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const app = require('../server');

test('GET /api/authors debe devolver los autores', async () => {
    const response = await request(app)
        .get('/api/authors');

    assert.strictEqual(response.statusCode, 200);
    assert.ok(Array.isArray(response.body));
});

test('GET /api/authors/:id debe devolver un author', async () => {
    const response = await request(app)
        .get('/api/authors/1');

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.id, 1);
});

test('POST /api/authors debe crear un author', async () => {
    const response = await request(app)
        .post('/api/authors')
        .send({
        name: 'Author Test',
        email: `test-${Date.now()}@example.com`,
        bio: 'Author creado durante los tests'
        });

    assert.strictEqual(response.statusCode, 201);
    assert.strictEqual(response.body.name, 'Author Test');
});

test('GET /api/authors/:id debe devolver 404 si no existe', async () => {
    const response = await request(app)
        .get('/api/authors/99999');

    assert.strictEqual(response.statusCode, 404);
});

test('POST /api/posts debe crear un post', async () => {
    const response = await request(app)
        .post('/api/posts')
        .send({
        title: 'Post creado durante los tests',
        content: 'Contenido del post de prueba',
        author_id: 1,
        published: false
        });

    assert.strictEqual(response.statusCode, 201);
    assert.strictEqual(response.body.title, 'Post creado durante los tests');
});