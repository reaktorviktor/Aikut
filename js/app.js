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

// Сохраняем товары в localStorage при клике на "Купить"
products.forEach((product, index) => {
    const button = document.querySelectorAll('.shop_buy')[index];
    button.addEventListener('click', () => {
        // Извлекаем существующий список товаров из localStorage или создаем пустой массив
        const savedProducts = JSON.parse(localStorage.getItem('love_products')) || [];

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
    });
});
