const express = require('express');

const router = express.Router();

const { getAuthors } = require('../services/authors');

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

module.exports = router;