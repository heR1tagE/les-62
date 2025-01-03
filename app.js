// Підключення необхідних бібліотек
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// Створення екземпляру Express
const app = express();

// Налаштування порту, на якому буде працювати сервер
const port = 3000;

// Налаштування шаблонізаторів (PUG та EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Вказуємо директорію для шаблонів

// Налаштування статики (для відображення файлів, як-от картинки, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Використання cookie-parser для роботи з cookies
app.use(cookieParser());

// Маршрут для домашньої сторінки
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' }); // Рендеринг шаблону
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`); 
});
