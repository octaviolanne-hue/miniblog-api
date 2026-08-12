const express = require('express');

const router = express.Router();

const {
    getPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
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

router.post('/', async (req, res) => {
    try {
        const { title, content, author_id, published } = req.body;

        if (!title || title.trim() === '') {
        return res.status(400).json({
            error: 'El título es obligatorio'
        });
        }

        if (!content || content.trim() === '') {
        return res.status(400).json({
            error: 'El contenido es obligatorio'
        });
        }

        if (!author_id) {
        return res.status(400).json({
            error: 'El author_id es obligatorio'
        });
        }

        const post = await createPost(
        title,
        content,
        author_id,
        published ?? false
        );

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creando post:', error);

        if (error.code === '23503') {
        return res.status(400).json({
            error: 'El author_id no existe'
        });
        }

        res.status(500).json({
        error: 'Error al crear post'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, content, author_id, published } = req.body;

        if (!title || title.trim() === '') {
        return res.status(400).json({
            error: 'El título es obligatorio'
        });
        }

        if (!content || content.trim() === '') {
        return res.status(400).json({
            error: 'El contenido es obligatorio'
        });
        }

        if (!author_id) {
        return res.status(400).json({
            error: 'El author_id es obligatorio'
        });
        }

        const post = await updatePost(
        req.params.id,
        title,
        content,
        author_id,
        published ?? false
        );

        if (!post) {
        return res.status(404).json({
            error: 'Post no encontrado'
        });
        }

        res.json(post);
    } catch (error) {
        console.error('Error actualizando post:', error);

        if (error.code === '23503') {
        return res.status(400).json({
            error: 'El author_id no existe'
        });
        }

        res.status(500).json({
        error: 'Error al actualizar post'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await deletePost(req.params.id);

        if (!post) {
        return res.status(404).json({
            error: 'Post no encontrado'
        });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error eliminando post:', error);

        res.status(500).json({
        error: 'Error al eliminar post'
        });
    }
});

module.exports = router;