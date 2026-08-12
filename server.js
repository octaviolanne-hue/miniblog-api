const { loadEnvFile } = require('node:process');

if (process.env.NODE_ENV !== 'production') {
    loadEnvFile('.env');
}

const express = require('express');
const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'MiniBlog API',
        endpoints: {
        authors: '/api/authors',
        posts: '/api/posts'
        }
    });
    });

app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});