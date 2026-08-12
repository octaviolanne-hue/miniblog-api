const pool = require('../db/config');

async function getAuthors() {
    const result = await pool.query(
        'SELECT * FROM authors ORDER BY id'
    );

    return result.rows;
}

module.exports = {
    getAuthors
};