const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'assets/img/notebook.jpg'},
    {id: 2, title: 'Mouse', price: 20, img: 'assets/img/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 200, img: 'assets/img/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50, img: 'assets/img/gamepad.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `<div class="product-item">
                <img src="${product.img}" style="width: 200px; height: 150px;">
                <h3>${product.title}</h3>
                <p>${product.price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    // const productsList = list.map(item => renderProduct(item.title,item.price));
    // console.log(productsList);
    document.querySelector('.products-cart').innerHTML = list.map(product => renderProduct(product)).join('');
};

renderPage(products);