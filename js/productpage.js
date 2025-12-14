// Get the ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch the specific product
const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
const result = await response.json();
const product = result.data;

function viewProductDetails() {
    const pjProduct = document.getElementById('pjProduct');
    pjProduct.innerHTML = '';

    const productCard = document.createElement('div');
    productCard.className = 'pj_product';
    productCard.innerHTML = `
        <div class="pj_productimg">
            <img src="${product.image.url}" alt="${product.title}">
        </div>
        <div class="pj_productinfo">
            <h2 class="pj_producttitle">${product.title}</h2>
            <p class="pj_productdescription">${product.description}</p>
            <div class="pj_select">
                <select>
                    <option>Select Size</option>
                   ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                </select>
                <div class="select-arrow"></div>
            </div>
            <div class="pj_quantity">
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value="1" min="1" max="10">
            </div>
            <p class="pj_productprice">$${product.price}</p>
            <button class="pj_addtocart" id="addToCart">Add to Cart</button>
        </div>
        <hr>
        <div id="pjReviews"></div>
    `;
    pjProduct.appendChild(productCard);
}

viewProductDetails();

function viewProductReviews() {
    const pjReviews = document.getElementById('pjReviews');
    pjReviews.className = 'pj_reviews';
    pjReviews.innerHTML = '<h4>Customer Reviews</h4>';
    if (product.reviews && product.reviews.length > 0) {
        product.reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'pj_review';
            reviewCard.innerHTML = `
                <h4>${review.reviewer}</h4>
                <p>Rating: ${review.rating} / 5</p>
                <p>${review.comment}</p>
            `;
            pjReviews.appendChild(reviewCard);
        });
    } else {
        pjReviews.innerHTML += '<p>No reviews yet. Be the first to review this product!</p>';
    }
}

viewProductReviews();

    // Placeholder reviews

// Add to cart functionality
const pjProduct = document.getElementById('pjProduct');
pjProduct.addEventListener('click', (event) => {
    if (event.target.id === 'addToCart') {
        alert('Product added to cart!');
    }
});