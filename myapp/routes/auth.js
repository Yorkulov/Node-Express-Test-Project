var express = require('express');
var router = express.Router();
const pool = require('../config/db');


pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully. Time:", result.rows[0]);
  }
});


router.get('/', (req, res) => {
  res.render('auth', { title: 'Express' });
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log("Received login data:", username, password);


  pool.query('SELECT * FROM users WHERE username = $1 AND password = $2;', [username, password])
  .then((result) => {
    console.log('DATA:', result.rows);

    if (result.rows.length > 0) {
      res.redirect('/home')
    } else {
      res.send('Login yoki parol noto‘g‘ri');
    }
  })
  .catch((error) => {
    console.error('ERROR:', error);
    res.status(500).send('Serverda xatolik yuz berdi');
  });

});


router.post('/signup', (req, res) => {
  const { username, email, phone_number, password } = req.body;

  const phoneNumber = phone_number || null;
  const userEmail = email || null;

  console.log("Received signup data:", { username, email, phone_number, password });

  pool.query(
      'INSERT INTO users (username, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *;',
      [username, userEmail, phoneNumber, password]
  )
  .then(data => {
      console.log('Signup successful:', data.rows[0]);
      res.send(`
          <html>
          <head>
            <title>Signup Muvaffaqiyatli</title>
          </head>
          <body>
            <h1>Signup muvaffaqiyatli o‘tdi!</h1>
            <p><a href="/auth">Login sahifasiga o'tish</a></p>
          </body>
        </html>
      `);
  })
  .catch(error => {
    console.error('Signup error:', error);
    const errorMessage = error.detail || 'Noma’lum xato yuz berdi';
    res.status(500).send(`Signupda xato yuz berdi. O\'zing to\'g\'irlab o\'qib olarsan:  ${errorMessage}`);
  });

});



module.exports = router;


