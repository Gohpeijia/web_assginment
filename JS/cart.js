let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

const cartList = document.getElementById("cartList");
const itemCount = document.getElementById("itemCount");
const totalPrice = document.getElementById("totalPrice");

function renderCart(){

    cartList.innerHTML = "";

    let total = 0;
    let items = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.qty;
        items += item.qty;

        cartList.innerHTML += `

        <div class="cart-item">

            <input type="checkbox" checked class="item-check">

            <img src="${item.img}" class="cart-image">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Size : ${item.size}</p>
            </div>

            <div class="cart-price">
                RM ${item.price.toFixed(2)}
            </div>

            <div class="cart-qty">
                <button onclick="decreaseQty(${index})">-</button>
                <span>${item.qty}</span>
                <button onclick="increaseQty(${index})">+</button>
            </div>

            <div class="cart-total">
                RM ${(item.price*item.qty).toFixed(2)}
            </div>

            <button class="remove-btn"
            onclick="removeItem(${index})">
            Remove
            </button>
        </div>
        `;
    });
    itemCount.innerHTML = items;
    totalPrice.innerHTML =
    "RM " + total.toFixed(2);
}

renderCart();

function increaseQty(index){
    cart[index].qty++;
    saveCart();
}

function decreaseQty(index){

    if(cart[index].qty>1){
        cart[index].qty--;
    }
    else{
        cart.splice(index,1);

    }
    saveCart();
}

function removeItem(index){

    cart.splice(index,1);
    saveCart();

}

function saveCart(){

sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
);

renderCart();

}

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click",()=>{

    if(cart.length==0){
        alert("Your cart is empty.");
        return;
    }
    alert("Thank you for your order!");
});
