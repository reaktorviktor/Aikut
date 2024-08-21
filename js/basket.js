const loveBox = document.getElementById('love_box');
const totalPriceElement = document.getElementById('total_price');

// Функция для обновления общей суммы
function updateTotalPrice() {
    const savedProducts = JSON.parse(localStorage.getItem('love_products')) || [];
    const totalPrice = savedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    totalPriceElement.innerText = `Стоимость товара: ${totalPrice} руб`;
}

// Функция для сохранения товаров в localStorage
function saveProducts(products) {
    localStorage.setItem('love_products', JSON.stringify(products));
    updateTotalPrice();
}

// Извлекаем сохраненные товары из localStorage
let savedProducts = JSON.parse(localStorage.getItem('love_products')) || [];

// Отображаем товары
savedProducts.forEach((product, index) => {
    const productHTML = `
            <div class="shop_block" data-index="${index}">
                <img src="${product.img}" alt="${product.name}" class="shop_img">
                <h3>${product.name}</h3>
                <div class="shop_controls">
                    <button class="decrease_button">-</button>
                    <span class="quantity">${product.quantity}</span>
                    <button class="increase_button">+</button>
                </div>
                <div class="shop_price">${product.price * product.quantity} руб</div>
                <span class="remove_button">✖</span>
            </div>
        `;
    loveBox.innerHTML += productHTML;
});

// Добавляем обработчики событий для кнопок
loveBox.addEventListener('click', (event) => {
    const index = event.target.closest('.shop_block').dataset.index;
    if (event.target.classList.contains('increase_button')) {
        savedProducts[index].quantity += 1;
    } else if (event.target.classList.contains('decrease_button')) {
        savedProducts[index].quantity = Math.max(1, savedProducts[index].quantity - 1);
    } else if (event.target.classList.contains('remove_button')) {
        savedProducts.splice(index, 1);
    }
    saveProducts(savedProducts);
    location.reload(); // Перезагружаем страницу, чтобы отобразить обновленные данные
});

updateTotalPrice();