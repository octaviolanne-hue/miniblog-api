const pool = require('../db/config');

async function getPosts() {
    const result = await pool.query(
        'SELECT * FROM posts ORDER BY id'
    );

    return result.rows;
}

async function getPostById(id) {
    const result = await pool.query(
        'SELECT * FROM posts WHERE id = $1',
        [id]
    );

    return result.rows[0];
}

async function getPostsByAuthor(authorId) {
    const result = await pool.query(
        `SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.published,
        posts.created_at,
        authors.id AS author_id,
        authors.name AS author_name,
        authors.email AS author_email,
        authors.bio AS author_bio
        FROM posts
        JOIN authors ON posts.author_id = authors.id
        WHERE posts.author_id = $1
        ORDER BY posts.id`,
        [authorId]
    );

    return result.rows;
}

module.exports = {
    getPosts,
    getPostById,
    getPostsByAuthor
};