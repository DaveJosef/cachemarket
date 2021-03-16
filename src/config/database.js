const pg = require('pg');
const redis = require('redis');
const dotenv = require('dotenv');

const { Pool } = pg;

dotenv.config();


// Conectando PostgreSQL

const {
    PG_USERNAME,
    PG_PASSWORD,
    PG_HOST,
    PG_PORT,
    PG_NAME
} = process.env;

const pool = new Pool({

    connectionString: `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_NAME}`,

})

pool.on('connect', () => {
    console.log('Postgres - on');
});


// Conectando Redis

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

client
    .on("connect", () => {
        console.log("Redis    - on");
    })
    .on("error", (error) => {
        console.log(error);
    });


// Exportando

module.exports = {
    query: (text, params) => pool.query(text, params),
    client
};