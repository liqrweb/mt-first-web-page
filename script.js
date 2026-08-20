let search = document.querySelector("#search");
let products = document.querySelectorAll(".shop .product");

if (search) {

    search.addEventListener("input", function(){

        let value = search.value.toLowerCase();

        products.forEach(function(product){

            let name = product.querySelector("h3").textContent.toLowerCase();

            if(name.includes(value)){
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });

}


let cartButtons = document.querySelectorAll(".product button");

cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        let product = button.parentElement;

        let name = product.querySelector("h3").textContent;
        let price = product.querySelector("p").textContent;
        let image = product.querySelector("img").getAttribute("src");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            name: name,
            price: price,
            image: image
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product added to cart successfully!");

    });

});


let cartItems = document.querySelector("#cart-items");
let total = document.querySelector("#total");

if(cartItems && total){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let totalPrice = 0;
    function updateTotal(){

    let newTotal = 0;

    let allItems = cartItems.querySelectorAll(".cart-item");

    allItems.forEach(function(item){

        let price = parseFloat(item.dataset.price);
        let quantity = parseInt(item.querySelector(".quantity").textContent);

        newTotal += price * quantity;

    });

    total.textContent = "$" + newTotal;

}

    cart.forEach(function(item,index){

        let div = document.createElement("div");
        div.classList.add("cart-item");
div.dataset.price = parseFloat(item.price.replace("$",""));

        div.innerHTML = `
            <img src="${item.image}" width="100">
            <h3>${item.name}</h3>
            <p>${item.price}</p>

            <div>
                <button class="minus">−</button>
                <span class="quantity">1</span>
                <button class="plus">+</button>
            </div>
        `;

        let minusButton = div.querySelector(".minus");
        let plusButton = div.querySelector(".plus");
        let quantity = div.querySelector(".quantity");

        let currentQuantity = 1;

        plusButton.addEventListener("click", function(){

            currentQuantity++;
            quantity.textContent = currentQuantity;
              updateTotal();

        });

        minusButton.addEventListener("click", function(){

            if(currentQuantity > 1){

                currentQuantity--;
                quantity.textContent = currentQuantity;
   updateTotal();
            }

        });


        let removeButton = document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function(){

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            location.reload();

        });

        div.appendChild(removeButton);

        cartItems.appendChild(div);

    });

    updateTotal();
}

let checkoutButton = document.querySelector(".checkout-btn");

if(checkoutButton){

    checkoutButton.addEventListener("click", function(){

        alert("Thank you for your order! Your order has been received.");

    });
}

let contactForm = document.querySelector(".contact form");

if(contactForm){

    contactForm.addEventListener("submit", function(event){

        event.preventDefault();

        alert("Thank you! Your message has been sent successfully.");
        localStorage.removeItem("cart");
        location.reload();
        contactForm.reset();

    });

}
let placeOrder = document.querySelector("#place-order");

if(placeOrder){

    placeOrder.addEventListener("click", function(){

        let name = document.querySelector("#customer-name").value;
        let phone = document.querySelector("#phone").value;
        let address = document.querySelector("#address").value;
        let city = document.querySelector("#city").value;

        if(name === "" || phone === "" || address === "" || city === ""){

            alert("Please fill all the details.");

        } else {

            alert("Thank you " + name + "! Your order has been placed successfully.");
            localStorage.removeItem("cart");
             location.reload();
        }

    });

}
let newsletterForm = document.querySelector(".newsletter form");

if(newsletterForm){

    newsletterForm.addEventListener("submit", function(event){

        event.preventDefault();

        alert("Thank you for subscribing to House of Qandeel!");

        newsletterForm.reset();

    });

}