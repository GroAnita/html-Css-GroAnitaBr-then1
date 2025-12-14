const API = await fetch ('https://v2.api.noroff.dev/rainy-days')
const response = await API.json();
const products = response.data;

const productSlider = document.getElementById('productSlider');
const fpProduct = document.getElementById('fpProduct');

let currentIndex = 0;
const productsPerPage = 4;

function displayProducts() {
    fpProduct.innerHTML = '';
    
    const endIndex = Math.min(currentIndex + productsPerPage, products.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        const product = products[i];
        
        const productCard = document.createElement('div');
        productCard.className = 'fp_product_card';
        productCard.innerHTML = `
            <div class="fp_productimg">
                <a href="product-pages/product.html?id=${product.id}">
                    <img src="${product.image.url}" alt="${product.title}" class="card_prod_img1">
                </a>
            </div>
            <div class="fp_productinfo">
                <h3 class="fp_producttitle">${product.title}</h3>
                <p class="fp_productprice">$${product.price}</p>
            </div>
            <div class="fp_productbtn">
            <button class="fp_addtocartbtn">Add to cart</button>
            </div>
        `;
        fpProduct.appendChild(productCard);
    }
    
    updateButtons();
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex + productsPerPage >= products.length;
}

function nextSlide() {
    if (currentIndex + productsPerPage < products.length) {
        currentIndex += productsPerPage;
        displayProducts();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex -= productsPerPage;
        displayProducts();
    }
}

// Make functions available globally
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

displayProducts();