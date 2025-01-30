// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Элементы DOM
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userBalance = document.getElementById('user-balance');

// Функция для получения данных пользователя
function initUserData() {
    const user = tg.initDataUnsafe.user;

    if (user) {
        // Устанавливаем аватар
        if (user.photo_url) {
            userAvatar.src = user.photo_url;
        }

        // Устанавливаем имя
        if (user.first_name) {
            userName.textContent = user.first_name;
        }

        // Устанавливаем баланс (заглушка)
        userBalance.textContent = `Баланс: $1000.00`;
    } else {
        console.error("Данные пользователя не найдены.");
    }
}

// Инициализация приложения
function initApp() {
    tg.expand(); // Развернуть приложение на весь экран
    initUserData(); // Загрузить данные пользователя
}

// Обработчики кнопок
document.getElementById('btn1').addEventListener('click', () => {
    alert('Кнопка 1 нажата');
});

document.getElementById('btn2').addEventListener('click', () => {
    alert('Кнопка 2 нажата');
});

document.getElementById('btn3').addEventListener('click', () => {
    alert('Кнопка 3 нажата');
});

document.getElementById('btn4').addEventListener('click', () => {
    alert('Кнопка 4 нажата');
});

// Запуск приложения
initApp();
