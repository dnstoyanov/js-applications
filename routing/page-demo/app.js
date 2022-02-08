import page from "//unpkg.com/page/page.mjs";

function homePage(ctx, next) {
    console.log(ctx)
    console.log(next)
    main.innerHTML = '<h2>Home page</h2><p>Welcome to our site!</p>';
}
function catalogPage() {
    main.innerHTML = '<h2>Home page</h2><p>Welcome to our site!</p><a href ="/catalog/1234">Product<a>';
}   

function catalogKitchenPage() {
    main.innerHTML = '<h2>Kitchen page</h2><p>List of items</p>';
} 

function detailsPage(ctx) {
    console.log(ctx)
    main.innerHTML = '<h2>Product</h2><p>Product Details</p><button>Buy Now</button>';
    document.querySelector('button').addEventListener('click', () =>{
        page.redirect('/checkout');
    })
}

function checkoutPage() {
    main.innerHTML = '<h2>Cart Details</h2><p>Products in cart</p>';
}

function aboutPage() {
    main.innerHTML = '<h2>About Us page</h2><p>Contact: +3695 23455 23</p>';
}   

const main = document.querySelector('main');

page('/home', homePage);
page('/catalog', catalogPage);
page('/catalog/kitchens', catalogKitchenPage);
page('/catalog/:id', detailsPage);
page('/about', aboutPage);
page('/checkout', checkoutPage);

page.redirect('/', '/home');

page.start();
