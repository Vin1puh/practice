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
    password: process.env.PG_PASSWORD,
    database: process.env.PG_NAME,
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

app.get('/api/filter-options', async (req, res) => {
    try {
        const queries = [
            pool.query('SELECT DISTINCT category FROM car_info'),
            pool.query('SELECT DISTINCT country FROM car_info'),
            pool.query('SELECT DISTINCT mark FROM car_info'),
            pool.query('SELECT DISTINCT model FROM car_info'),
            pool.query('SELECT DISTINCT year FROM car_info'),
            pool.query('SELECT DISTINCT price FROM car_info'),
            pool.query('SELECT DISTINCT runned FROM car_info'),
            pool.query('SELECT DISTINCT weight FROM car_info'),
        ];

        const results = await Promise.all(queries);

        res.json({
            category: results[0].rows.map(row => row.category),
            country: results[1].rows.map(row => row.country),
            mark: results[2].rows.map(row => row.mark),
            model: results[3].rows.map(row => row.model),
            year: results[4].rows.map(row => row.year),
            price: results[5].rows.map(row => row.price),
            runned: results[6].rows.map(row => row.runned),
            weight: results[7].rows.map(row => row.weight),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

app.post('/api/filter', async (req, res) => {
    try {
        const filters = req.body;
        let query = 'SELECT * FROM car_info WHERE 1=1';
        const params = [];
        let paramIndex = 1;

        if (filters.category) {
            query += ` AND category = $${paramIndex}`;
            params.push(filters.category);
            paramIndex++;
        }

        if (filters.country) {
            query += ` AND country = $${paramIndex}`;
            params.push(filters.country);
            paramIndex++;
        }

        if (filters.mark) {
            query += ` AND mark = $${paramIndex}`;
            params.push(filters.mark);
            paramIndex++;
        }

        if (filters.model) {
            query += ` AND model = $${paramIndex}`;
            params.push(filters.model);
            paramIndex++;
        }

        if (filters.year) {
            query += ` AND year >= $${paramIndex}`;
            params.push(filters.year);
            paramIndex++;
        }

        if (filters.price) {
            query += ` AND price <= $${paramIndex}`;
            params.push(filters.price);
            paramIndex++;
        }

        if (filters.runned) {
            query += ` AND runned <= $${paramIndex}`;
            params.push(filters.runned);
            paramIndex++;
        }

        if (filters.weight) {
            query += ` AND weight <= $${paramIndex}`;
            params.push(filters.weight);
            paramIndex++;
        }

        query += ' ORDER BY id';

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/cars', async (req, res) => {
    try{
        const addtodor = await pool.query("SELECT * FROM car_info ORDER BY id")
        res.json(addtodor.rows)
    }
    catch(err){
        console.error(err);
    }
})

app.post('/api/search', async (req, res) => {
    try {
        const { query } = req.body;

        if (!query || query.trim() === '') {
            return res.json([]);
        }

        const searchResult = await pool.query(
            `SELECT * FROM car_info 
             WHERE LOWER(mark) LIKE LOWER($1) 
                OR LOWER(model) LIKE LOWER($2) 
             ORDER BY id`,
            [`%${query}%`, `%${query}%`]
        );

        res.json(searchResult.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/create', async (req, res) => {
    try{
        const {
            mark,
            model,
            image,
            seller,
            category,
            year,
            runned,
            country,
            weight,
            price,
            brutto_price,
            rewiew,
            stat,
            location,
            head_stat
        } = req.body;

        const newCar = await pool.query(
            'INSERT INTO car_info (mark, model, image, seller, category, year, runned, country, weight, price, brutto_price, rewiew, stat, location, head_stat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING mark, model, image, seller, category, year, runned, country, weight, price, brutto_price, rewiew, stat, location, head_stat',
            [mark, model, image, seller, category, year, runned, country, weight, price, brutto_price, rewiew, stat, location, head_stat]
        )

        res.json({
            success: true,
            car: newCar.rows[0],
        });
    }
    catch (err){
        console.error(err)
    }
})

app.put('/api/user/:email', async (req, res) => {
    try{
        const { email } = req.params;
        const { newEmail } = req.body;
        const updateUser = await pool.query("UPDATE users SET email = $2 WHERE email = $1 RETURNING *", [email, newEmail]);
        res.json({
            success: true,
            newEmail: updateUser.rows[0],
        });
    }
    catch(err){
        console.error(err);
        res.json({
            success: false,
        })
    }
})

app.post('/api/register', async (req, res) => {
    try {
        const { email, password, name, second_name } = req.body

        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        if (userExists.rows.length > 0) {
            return res.json({ success: false, message: 'Такой email уже есть' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (email, password, name, second_name, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [email, hashedPassword, name, second_name]
        )

        res.json({
            success: true,
            user: newUser.rows[0]
        })
    } catch (error) {
        res.json({ success: false, message: 'Ошибка сервера' })
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const userResult = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        if (userResult.rows.length === 0) {
            return res.json({ success: false, message: 'Неверный логин или пароль' })
        }

        const user = userResult.rows[0]

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return res.json({
                success: false,
            })
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                second_name: user.second_name
            }
        })
    } catch (error) {
        res.json({ success: false, message: 'Ошибка сервера' })
    }
})

app.post('/api/create_messages', async (req, res) => {
    try{
        const { sender_name, message, user_id, sender_id } = req.body;
        const newMessage = await pool.query('INSERT INTO messages (sender_name, message, user_id, sender_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [sender_name, message, user_id, sender_id])
        res.json({
            success: true,
            created: newMessage.rows[0]
        })
    }catch(err){
        res.json({
            success: false
        })
        console.error(err)
    }
})

app.get('/api/get_messages/:user_id', async (req, res) => {
    try{
        const { user_id } = req.params;
        const getMessages = await pool.query('SELECT * FROM messages WHERE user_id = $1', [user_id]);
        res.json({
            success: true,
            messages: getMessages.rows
        });
    }catch (e) {
        console.error(e)
        res.json({
            success: false
        })
    }
})

app.put('/api/update_messages/:id', async (req, res) => {
    try{
        const { id } = req.params
        const updateMessage = await pool.query('UPDATE messages SET is_new = false WHERE id = $1', [id])
        res.json({
            success: true,
            updated: updateMessage.rows[0]
        })
    }catch(err){
        res.json({
            success: false
        })
        console.error(err)
    }
})

app.get('/api/get_userByName/:name', async (req, res) => {
    try{
        const {name} = req.params;
        const getUser = await pool.query('SELECT * FROM users WHERE name = $1', [name]);

        res.json({
            success: true,
            user: getUser.rows[0]
        })
    }catch (err){
        res.json({
            success: false
        })
        console.error(err)
    }
})

app.get('/api/get_user/:user_id', async (req, res) => {
    try{
        const { user_id } = req.params;
        const getUser = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);

        res.json({
            success: true,
            sender: getUser.rows[0]
        });
    }catch(err){
        console.error(err)
        res.json({
            success: false
        })
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});