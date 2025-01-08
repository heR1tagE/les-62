const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 3000;
const secretKey = 'your_secret_key';

// Налаштування шаблонізаторів
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Підключення статики
app.use(express.static(path.join(__dirname, 'public')));

// Підключення cookie-parser
app.use(cookieParser());

// Маршрут для домашньої сторінки
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

// Маршрут для встановлення теми
app.get('/set-theme/:theme', (req, res) => {
  const { theme } = req.params;
  res.cookie('theme', theme, { maxAge: 900000, httpOnly: true });
  res.send(`Theme set to ${theme}`);
});

// Маршрут для отримання теми
app.get('/get-theme', (req, res) => {
  const theme = req.cookies.theme || 'default';
  res.send(`Current theme is ${theme}`);
});

// Реєстрація користувача
app.post('/register', (req, res) => {
  const user = { id: 1, username: 'user1' };
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.send('User registered');
});

// Логін користувача
app.post('/login', (req, res) => {
  const user = { id: 1, username: 'user1' };
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.send('User logged in');
});

// Middleware для перевірки JWT
const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send('Access denied');
  }
  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

// Захищений маршрут
app.get('/protected', verifyJWT, (req, res) => {
  res.send(`Welcome, ${req.user.username}`);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
