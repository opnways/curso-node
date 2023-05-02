const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
host: 'localhost',database: 'nombre_de_tu_base_de_datos',
password: '1234',
port: 5432,
});

exports.pool = pool;