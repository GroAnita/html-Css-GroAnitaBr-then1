const API = await fetch('https://v2.api.noroff.dev/rainy-days');
const response = await API.json();
const allProducts = response.data;

// Filter for women's products only
const products = allProducts.filter(product => product.gender === 'Female');

const womenProducts = document.getElementById('womenProducts');

let currentIndex = 0;
const productsPerPage = 12;

function displayWomenProducts() {
    womenProducts.innerHTML = '';
    
    const endIndex = Math.min(currentIndex + productsPerPage, products.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        const product = products[i];
        
        const productCard = document.createElement('div');
        productCard.className = 'fp_product';
        productCard.innerHTML = `
            <div class="fp_productimg">
                
                    <img src="${product.image.url}" alt="${product.title}">
                
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
                <button class="fp_addtocartbtn goToProduct" data-product-id="${product.id}">Go to Product</button>
                <div class="fp_productbtn">
            <button class="fp_addtocartbtn">Add to cart</button>
            </div>
            </div>
        
            
        `;
        womenProducts.appendChild(productCard);
    }
}

womenProducts.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = event.target.closest('.fp_product').querySelector('a').getAttribute('href').split('=')[1];
        addToCart(productId);
    }
});

womenProducts.addEventListener('click', (event) => {
    if (event.target.classList.contains('goToProduct')) {
        const productId = event.target.getAttribute('data-product-id');
        window.location.href = `productpage.html?id=${productId}`;
    }
});


displayWomenProducts();