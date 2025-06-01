const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'yaallah9',
    database: 'mydb1_db' 
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Failed to save user data.');
        }
        console.log('User data saved:', result);
        res.send('User data saved successfully!');
    });
});


app.post('/book', (req, res) => {
    const { place_name, guests, arrival_date, leaving_date } = req.body;

    const sql = 'INSERT INTO bookings (place_name, guests, arrival_date, leaving_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [place_name, guests, arrival_date, leaving_date], (err, result) => {
        if (err) {
            console.error('Error inserting booking data:', err);
            return res.status(500).send('Failed to save booking data.');
        }
        console.log('Booking data saved:', result);
        res.send('Booking data saved successfully!');
    });
});

app.listen(2000, () => {
    console.log('Server running on http://localhost:2000');
});
