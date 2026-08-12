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