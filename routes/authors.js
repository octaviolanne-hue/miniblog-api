const express = require('express');

const router = express.Router();

const {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor
} = require('../services/authors');

router.get('/', async (req, res) => {
    try {
        const authors = await getAuthors();

        res.json(authors);
    } catch (error) {
        console.error('Error obteniendo autores:', error);

        res.status(500).json({
        error: 'Error al obtener autores'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const author = await getAuthorById(req.params.id);

        if (!author) {
        return res.status(404).json({
            error: 'Author no encontrado'
        });
        }

        res.json(author);
    } catch (error) {
        console.error('Error obteniendo autor:', error);

        res.status(500).json({
        error: 'Error al obtener autor'
        });
    }
});

router.post('/', async (req, res) => {
    try {
    const { name, email, bio } = req.body;

        if (!name || name.trim() === '') {
        return res.status(400).json({
            error: 'El nombre es obligatorio'
        });
        }

        if (!email || email.trim() === '') {
        return res.status(400).json({
            error: 'El email es obligatorio'
        });
        }

    const author = await createAuthor(name, email, bio);

    res.status(201).json(author);
    } catch (error) {
        console.error('Error creando autor:', error);

        if (error.code === '23505') {
        return res.status(400).json({
            error: 'El email ya está registrado'
        });
        }

        res.status(500).json({
        error: 'Error al crear autor'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, email, bio } = req.body;

        if (!name || name.trim() === '') {
        return res.status(400).json({
            error: 'El nombre es obligatorio'
        });
        }

        if (!email || email.trim() === '') {
        return res.status(400).json({
            error: 'El email es obligatorio'
        });
        }

        const author = await updateAuthor(
        req.params.id,
        name,
        email,
        bio
        );

        if (!author) {
        return res.status(404).json({
            error: 'Author no encontrado'
        });
        }

        res.json(author);
    } catch (error) {
        console.error('Error actualizando autor:', error);

        if (error.code === '23505') {
        return res.status(400).json({
            error: 'El email ya está registrado'
        });
        }

        res.status(500).json({
        error: 'Error al actualizar autor'
        });
    }
    });

module.exports = router;