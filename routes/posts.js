const express = require('express');

const router = express.Router();

const {
    getPosts,
    getPostById,
    getPostsByAuthor
} = require('../services/posts');

router.get('/', async (req, res) => {
    try {
        const posts = await getPosts();

        res.json(posts);
    } catch (error) {
        console.error('Error obteniendo posts:', error);

        res.status(500).json({
        error: 'Error al obtener posts'
        });
    }
});

router.get('/author/:authorId', async (req, res) => {
    try {
        const posts = await getPostsByAuthor(req.params.authorId);

        res.json(posts);
    } catch (error) {
        console.error('Error obteniendo posts del autor:', error);

        res.status(500).json({
        error: 'Error al obtener posts del autor'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await getPostById(req.params.id);

        if (!post) {
        return res.status(404).json({
            error: 'Post no encontrado'
        });
        }

        res.json(post);
    } catch (error) {
        console.error('Error obteniendo post:', error);

        res.status(500).json({
        error: 'Error al obtener post'
        });
    }
});

module.exports = router;