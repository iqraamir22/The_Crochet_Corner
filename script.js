console.log("The Crochet Corner website is working!");

const instagramLink= document.getElementById("instagramLink");

instagramLink.addEventListener("click", function () {
    alert("You are being redirected to our Instagram page!");
});

function showCategory(category) {
    const products = document.querySelectorAll(".product");

    products.forEach(function(product) {
        if (category === "all") {
            product.style.display = "block";
        } 
        else if (product.classList.contains(category)) {
            product.style.display = "block";
        } 
        else {
            product.style.display = "none";
        }
    });
}

const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(function(button)
{
    button.addEventListener("click",function() {
        const productName = button.parentElement.querySelector("h3").textContent;
        const message = "Assalam o Alaikum! I want to order:" + productName;
        const whatsappURL = "https://wa.me/923314986136?text=" + encodeURIComponent(message);
        window.open(whatsappURL,"_blank");
        });
});

function showCategory(category) {
    const galleries = document.querySelectorAll(".product-gallery");
    const products = document.querySelectorAll(".product");

    galleries.forEach(function(gallery) {
        gallery.style.display = "none";
    });

    if (category === "all") {
        products.forEach(function(product) {
            product.style.display = "block";
        });
    } else {
        products.forEach(function(product) {
            if (product.classList.contains(category)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });

        const selectedGallery = document.getElementById(category);

        if (selectedGallery) {
            selectedGallery.style.display = "flex";
        }
    }
}

let cart = [];

function addToCart(name, price) {
    cart.push({
        name: name,
        price: price,
        quantity: 1
    });

    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {
        const product = document.createElement("div");

        product.innerHTML =
            item.name + " - Rs. " + item.price +
            '<br>' +
            '<button onclick="decreaseQuantity(' + index + ')">−</button> ' +
            item.quantity +
            ' <button onclick="increaseQuantity(' + index + ')">+</button>';

        cartItems.appendChild(product);

        total = total + (item.price * item.quantity);
    });

    cartTotal.textContent = total;
   
}

const orderSummary = document.getElementById("orderSummary");

if (orderSummary) {
    orderSummary.innerHTML = "";

    cart.forEach(function(item) {
        const itemText = document.createElement("p");

        itemText.textContent =
            item.name + " × " + item.quantity +
            " - Rs. " + (item.price * item.quantity);

        orderSummary.appendChild(itemText);
    });
}

function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        displayCart();
    }
}

const orderForm = document.querySelector("#order-form form");

orderForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    
    const whatsappNumber = "923314986136";

    let orderDetails = "";

    cart.forEach(function(item) {
        orderDetails +=
            item.name + " x " + item.quantity +
            " = Rs. " + (item.price * item.quantity) + "\n";
    });

    const total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);

    const message =
        "*New Order - The Crochet Corner* \n\n" +
        " Name: " + name + "\n" +
        " Phone: " + phone + "\n" +
        " Address: " + address + "\n\n" +
        " *Order Details:*\n" +
        orderDetails +
        "\n *Total: Rs. " + total + "*";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

    alert(" Order Placed Successfully!\n\nYour WhatsApp order message is ready.");

    window.location.href = whatsappURL;

    cart = [];
    updateCart();
    orderForm.reset();
});


