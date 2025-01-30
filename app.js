const tg = window.Telegram.WebApp;
const backendUrl = "https://ваш-бэкенд.ру/get_balance"; // Замени на реальный URL бэкенда

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

        // Получаем баланс с бэкенда
        fetchBalance(user.id);
    } else {
        console.error("Данные пользователя не найдены.");
    }
}

// Функция для получения баланса
function fetchBalance(telegramId) {
    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegram_id: telegramId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.balance !== undefined) {
            userBalance.textContent = `Баланс: $${data.balance.toFixed(2)}`;
        } else {
            console.error("Ошибка при получении баланса:", data.error);
        }
    })
    .catch(error => {
        console.error("Ошибка при запросе к бэкенду:", error);
    });
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
