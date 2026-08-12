const express = require('express');

const router = express.Router();

const { getAuthors, getAuthorById } = require('../services/authors');

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

module.exports = router;