const pool = require('../db/config');

async function getAuthors() {
    const result = await pool.query(
        'SELECT * FROM authors ORDER BY id'
    );

    return result.rows;
}

async function getAuthorById(id) {
    const result = await pool.query(
        'SELECT * FROM authors WHERE id = $1',
        [id]
    );

    return result.rows[0];
    }

module.exports = {
    getAuthors,
    getAuthorById
};