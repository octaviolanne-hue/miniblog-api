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

async function createPost(title, content, authorId, published) {
    const result = await pool.query(
        `INSERT INTO posts (title, content, author_id, published)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [title, content, authorId, published]
    );

    return result.rows[0];
}

async function updatePost(id, title, content, authorId, published) {
    const result = await pool.query(
        `UPDATE posts
        SET title = $1, content = $2, author_id = $3, published = $4
        WHERE id = $5
        RETURNING *`,
        [title, content, authorId, published, id]
    );

    return result.rows[0];
}

async function deletePost(id) {
    const result = await pool.query(
        'DELETE FROM posts WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0];
}

module.exports = {
    getPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
};