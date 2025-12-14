const API = await fetch('https://v2.api.noroff.dev/rainy-days');
const response = await API.json();
const allProducts = response.data;

// Filter for men's products only
const products = allProducts.filter(product => product.gender === 'Male');

const menProducts = document.getElementById('menProducts');

let currentIndex = 0;
const productsPerPage = 12;

function displayMenProducts() {
    menProducts.innerHTML = '';
    
    const endIndex = Math.min(currentIndex + productsPerPage, products.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        const product = products[i];
        
        const productCard = document.createElement('div');
        productCard.className = 'fp_product';
        productCard.innerHTML = `
            <div class="fp_productimg">
                <a href="product-pages/product.html?id=${product.id}">
                    <img src="${product.image.url}" alt="${product.title}">
                </a>
                ${product.onSale ? '<label class="onsale">On Sale</label>' : ''}
            </div>
            <div class="fp_products_txt">
                <h4>${product.title}</h4>
                <div class="price_discount">
                    ${product.onSale ? 
                        `<h2 class="original-price">$${product.price}</h2>
                         <p class="discount_price">$${product.discountedPrice}</p>` 
                        : 
                        `<h2>$${product.price}</h2>`
                    }
                </div>
                <div class="fp_productbtn">
                <button class="fp_addtocartbtn goToProduct" data-product-id="${product.id}">Go to Product</button>
            <button class="fp_addtocartbtn add-to-cart" >Add to cart</button>
            </div>  
            </div>
        
            
        `;
        menProducts.appendChild(productCard);
    }
}

menProducts.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = event.target.closest('.fp_product').querySelector('a').getAttribute('href').split('=')[1];
        addToCart(productId);
    }
});

menProducts.addEventListener('click', (event) => {
    if (event.target.classList.contains('goToProduct')) {
        const productId = event.target.getAttribute('data-product-id');
        window.location.href = `productpage.html?id=${productId}`;
    }
});


displayMenProducts();

