require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Pool} = require('pg')

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

const pool = new Pool({
    user: process.env.PG_USER,
    password: '13579Boris1337',
    database: 'new',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
})

app.get('/cars/seller/:name', async (req, res) => {
    try {
        const sellerName = req.params.name;

        const addtodor = await pool.query(
            "SELECT * FROM car_info WHERE seller = $1",
            [sellerName]
        );

        res.json(addtodor.rows);
    } catch(err) {
        console.error(err);
    }
});

app.get('/cars/stars', async (req, res) => {
    try{
        const addtodor = await pool.query("SELECT * FROM car_info WHERE is_star = true ORDER BY id")
        res.json(addtodor.rows)
    }
    catch(err){
        console.error(err);
    }
})

app.get('/cars', async (req, res) => {
    try{
        const addtodor = await pool.query("SELECT * FROM car_info ORDER BY id")
        res.json(addtodor.rows)
    }
    catch(err){
        console.error(err);
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});