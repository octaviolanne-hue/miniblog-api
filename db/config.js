const { Pool } = require('pg');

console.log('DATABASE_URL existe:', !!process.env.DATABASE_URL);

if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);

    console.log('DATABASE host:', url.hostname);
    console.log('DATABASE port:', url.port);
    console.log('DATABASE database:', url.pathname);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;