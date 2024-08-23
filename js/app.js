const products = [
    {
        "name": "Набор с зефиром \"Восторг\"",
        "img": "https://macaronshop.ru/wp-content/uploads/2024/04/sladkie-podarki-2.png",
        "price": 790
    },
    {
        "name":"Набор с эклерами \"Услада\"",
        "img":"https://macaronshop.ru/wp-content/uploads/2023/04/macaron-s-eklerami.png",
        "price": 960
    },
    {
        "name":"Набор-комбо ко Дню Строителя",
        "img":"https://macaronshop.ru/wp-content/uploads/2022/11/podarok-na-den-rogdeniya-2.png",
        "price": 690
    },
    {
        "name":"Детский набор макарон",
        "img":"https://macaronshop.ru/wp-content/uploads/2023/03/detskiy.jpg",
        "price": 1190
    },
    {
        "name":"Подарок на день рождения",
        "img":"https://macaronshop.ru/wp-content/uploads/2022/10/podarki-na-den-rogdeniya-1.png",
        "price": 1190
    },
    {
        "name":"Набор с эклерами \"Изюминка\"",
        "img":"https://macaronshop.ru/wp-content/uploads/2023/04/macaron-s-eklerami-5.png",
        "price": 960
    }
];

// Функция для обновления кнопки на ссылку
function updateButtonToLink(button) {
    button.disabled = true;
    button.innerHTML = '<a style="text-decoration: none; pointer-events: auto; color: #2efc00" href="https://htmlpreview.github.io/?https://raw.githubusercontent.com/reaktorviktor/Aikut/main/page/basket.html">&#9989; В корзину</a>';
    button.style.pointerEvents = 'none'; // Делаем кнопку неактивной
}

// Сохраняем товары в localStorage при клике на "Купить"
products.forEach((product, index) => {
    const button = document.querySelectorAll('.shop_buy')[index];

    // Проверяем, есть ли товар уже в корзине при загрузке страницы, чтобы сразу заменить кнопку
    let savedProducts = JSON.parse(localStorage.getItem('love_products')) || [];
    const existingProduct = savedProducts.find(item => item.name === product.name);
    if (existingProduct) {
        updateButtonToLink(button);
    }

    button.addEventListener('click', () => {
        // Извлекаем существующий список товаров из localStorage или создаем пустой массив
        let savedProducts = JSON.parse(localStorage.getItem('love_products')) || [];

        // Проверяем, есть ли уже этот товар в корзине
        const existingProductIndex = savedProducts.findIndex(item => item.name === product.name);
        if (existingProductIndex !== -1) {
            // Если товар уже есть, увеличиваем его количество
            savedProducts[existingProductIndex].quantity += 1;
        } else {
            // Если товара нет, добавляем его с количеством 1
            savedProducts.push({ ...product, quantity: 1 });
        }

        // Сохраняем обновленный массив в localStorage
        localStorage.setItem('love_products', JSON.stringify(savedProducts));

        // Заменяем кнопку на ссылку "В корзину"
        updateButtonToLink(button);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let blocks = document.querySelectorAll('.block');

    function checkBlocksVisibility() {
        let windowHeight = window.innerHeight;

        blocks.forEach(block => {
            let blockPosition = block.getBoundingClientRect().top;

            if (blockPosition < windowHeight - 100) {
                block.style.opacity = "1";
                block.style.transform = "translateY(0)";
            }
        });
    }

    checkBlocksVisibility();

    window.addEventListener('scroll', function() {
        checkBlocksVisibility();
    });
});

    const actionBlock = document.querySelector('.action_block');
    let isDown = false;
    let startX;
    let scrollLeft;

    actionBlock.addEventListener('mousedown', (e) => {
    isDown = true;
    actionBlock.classList.add('active');
    startX = e.pageX - actionBlock.offsetLeft;
    scrollLeft = actionBlock.scrollLeft;
});

    actionBlock.addEventListener('mouseleave', () => {
    isDown = false;
    actionBlock.classList.remove('active');
});

    actionBlock.addEventListener('mouseup', () => {
    isDown = false;
    actionBlock.classList.remove('active');
});

    actionBlock.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - actionBlock.offsetLeft;
    const walk = (x - startX) * 1.2; // Скорость прокрутки
    actionBlock.scrollLeft = scrollLeft - walk;
});
