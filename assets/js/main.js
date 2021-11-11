class ProductList {
    constructor(container = '.products-cart'){
        this.container = container;
        this._products = [];
        this._goodProduct = [];
        
        this._getProduct();
        this._render();
        this.allSum();
    }

    _getProduct() {
        this._products = [
            {id: 1, title: 'Notebook', price: 2000, img: 'assets/img/notebook.jpg'},
            {id: 2, title: 'Mouse', price: 20, img: 'assets/img/mouse.jpg'},
            {id: 3, title: 'Keyboard', price: 200, img: 'assets/img/keyboard.jpg'},
            {id: 4, title: 'Gamepad', price: 50, img: 'assets/img/gamepad.jpg'},
        ];
    }


    _render() {
        const productPage = document.querySelector(this.container);

        for( const product of this._products) {
            const productObject = new ProductItem(product);
            this._goodProduct.push(productObject);

            productPage.insertAdjacentHTML('beforeend', productObject.renderPage());
        }
    }
    allSum() {
        let sum = 0;
        this._products.forEach(product => {
            sum += product.price;
        });
        
        document.querySelector('span').innerHTML = sum;
    }
}

class ProductItem{
    constructor(item){
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.img = item.img;
    }

    renderPage() {
        return `
        <div class="product-item" data-id="${this.id}">
                <img src="${this.img}" style="width: 200px; height: 150px;">
                <h3>${this.title}</h3>
                <p>${this.price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`;
        
    }
}

const catalog = new ProductList();
