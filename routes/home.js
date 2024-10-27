var express = require('express');
var router = express.Router();
const pool = require('../config/db');


router.get('/', async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM users'); 
    const users = result.rows; 
    res.render('home', { users }); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Foydalanuvchilarni olishda xato yuz berdi');
  }
});


router.delete('/delete/:id', (req, res) => {
  const userId = req.params.id; 
  console.log(userId)
  pool.query('DELETE FROM users WHERE id = $1', [userId])
    .then(result => {
      if (result.rowCount > 0) {
        res.status(200).send('Foydalanuvchi muvaffaqiyatli o‘chirildi.');
      } else {
        res.status(404).send('Foydalanuvchi topilmadi.');
      }
    })
    .catch(error => {
      console.error('Foydalanuvchini o‘chirishda xato:', error);
      res.status(500).send('Foydalanuvchini o‘chirishda xato yuz berdi.');
    });
});


router.get('/edit/:id', (req, res) => {
  const userId = req.params.id;

  pool.query('SELECT * FROM users WHERE id = $1', [userId])
    .then(result => {
      if (result.rows.length > 0) {
        const user = result.rows[0];
        res.render('edit', { user });
      } else {
        res.status(404).send('Foydalanuvchi topilmadi.');
      }
    })
    .catch(error => {
      console.error('Foydalanuvchini olishda xato:', error);
      res.status(500).send('Foydalanuvchini olishda xato yuz berdi.');
    });
});


router.post('/edit/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email, phone_number } = req.body;

  pool.query(
    'UPDATE users SET username = $1, email = COALESCE(NULLIF($2, \'\'), email), phone_number = COALESCE(NULLIF($3, \'\'), phone_number) WHERE id = $4',
    [username, email, phone_number, userId]
  )
    .then(result => {
      if (result.rowCount > 0) {
        res.redirect('/home');
      } else {
        res.status(404).send('Foydalanuvchi topilmadi.');
      }
    })
    .catch(error => {
      console.error('Foydalanuvchini yangilashda xato:', error);
      res.status(500).send('Foydalanuvchini yangilashda xato yuz berdi: ' + error.message);
    });
});



module.exports = router;

