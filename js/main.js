const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
function backetActive() {
  document.querySelector('#backet').classList.toggle('active');
}

window.onclick = event => {
  if(!event.target.matches('.btn-cart')){
   const blockBacket = document.querySelector('.backet');
   for(let i = 0; i < blockBacket.length; i++) {
     let openBacket = blockBacket[i];
     if(openBacket.classList.contains('active')) {
       openBacket.classList.remove('active');
     }
   }
  }
} 
// Переделать в ДЗ не использовать fetch а Promise
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };
// –--------------------------------

class ProductList {
  #goods;
  #allProducts;

  constructor(container = '.products') {
    this.container = container;
    this.#goods = [];
    this.#allProducts = [];

    // this._fetchGoods();
    this.#getProducts().then((data) => {
      this.#goods = data;
      this.#render();
    });

    console.log(this.sum());
  }

  // _fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     console.log(data);
  //     this.#goods = JSON.parse(data);
  //     this.#render();
  //     console.log(this.#goods);
  //   });
  // }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(response => response.json())
        .catch((error) => {
          console.log(error);
        });
  }

  sum() {
    return this.#allProducts.reduce((sum, { price }) => sum + price, 0);
  }

  #render() {
    const block = document.querySelector(this.container);

    for (let product of this.#goods) {
      const productObject = new ProductItem(product);

      this.#allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getGoodHTML());
    }
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  getGoodHTML() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
            </div>`;
  }
}

const list = new ProductList();

class BacketProduct {
  #backetGoods
  #backetProducts
  constructor(backet = '#backet'){
      this.backet = backet;
      this.#backetGoods = [];
      this.#backetProducts = [];
      
      this.#getBacketProduct().then(data => {
          this.#backetGoods = data.contents;
          console.log();
          this.#backetRender();
      });
    }

  #getBacketProduct(){
    return fetch(`${API}/getBasket.json`)
      .then(response => response.json())
      .catch((error) => {
        console.log(error);
      })
  }

  #backetRender(){
    const backet = document.querySelector(this.backet);

    for(let product of this.#backetGoods){
      const backetObject = new BacketItem(product);
      this.#backetProducts.push(backetObject);

      backet.insertAdjacentHTML('beforeend', backetObject.backetHTML());
    }
  }
}

class BacketItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.name = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.quantity = product.quantity;
    this.img = img;
  }

  backetHTML(){
    return `<div class="product-backet" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.name}</h3>
                  <p>${this.price} \u20bd</p>
                  <p>${this.quantity}</p>
              </div>
            </div>`;
  }
}

const backetList = new BacketProduct();

