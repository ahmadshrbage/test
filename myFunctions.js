function validateArabic(input) {
    var arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/; // نطاق الحروف العربية

    if (!arabicRegex.test(input.value)) {
        alert("الرجاء إدخال الأحرف العربية فقط.");
        input.value = ''; // إفراغ حقل الاسم
    }
}

function buy() {
    // تحقق من صحة Captcha
    var response = grecaptcha.getResponse();
    
    if (response.length === 0) {
        alert("الرجاء إثبات أنك لست روبوتًا!");
    } else {
        // استمر في عملية الشراء
        // ... الكود الخاص بك هنا ...
    }
}

function showCheckoutForm() {
    var checkoutForm = document.getElementById('checkout-form');
    checkoutForm.style.display = 'block';
}

function buy() {
    // قم بفحص البيانات واتخاذ الإجراءات اللازمة
    alert('تم الشراء بنجاح!');
}


if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready);
}

else{
    ready();
}


function ready() {
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButton.length; i++) {
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', function (event) {
            addToCartClicked(event);
        });
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}
 function addToCartClicked(event) {
    var buttonClicked = event.target;
    var shopItem = buttonClicked.parentElement.parentElement;

    var title = shopItem.querySelector('.shop-item-title').innerText;
    var price = parseFloat(shopItem.querySelector('.cart-item-price').innerText.replace(' ل.س', ''));

    var cartRows = document.querySelectorAll('.cart-row');

    for (var i = 0; i < cartRows.length; i++) {
        var row = cartRows[i];
        var cartItemTitle = row.querySelector('.cart-item-title').innerText;

        if (cartItemTitle === title) {
            // المنتج موجود بالفعل في السلة، زيادة الكمية فقط
            var quantityElement = row.querySelector('.cart-quantity-input');
            quantityElement.value = parseInt(quantityElement.value) + 1;
            updateCartTotal();
            return;
        }
    }

    // إذا كان المنتج ليس موجودًا بالفعل، يتم إضافته كعنصر جديد
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');

    var cartRowContents = `
        <td class="cart-item-title">${title}</td>
        <td class="cart-item-price">${price} ل.س</td>
        <td>
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" onclick="removeCartItem()">حذف</button>
        </td>
        <td class="cart-item-total">${price} ل.س</td>
    `;

    cartRow.innerHTML = cartRowContents;

    var cartTable = document.querySelector('.cart-items');
    cartTable.appendChild(cartRow);

    // إضافة مستمعين للأحداث للعناصر الجديدة
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);

    updateCartTotal();
}

 function purchaseClicked(){
     alert('Thank you for your purchase!!!');
     var cartItems = document.getElementsByClassName('cart-items')[0];
     while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild)
     }
     updateCartTotal();
 }

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}
// myFunctions.js
// myFunctions.js

function addToCart() {
    var buttonClicked = event.target;
    var shopItem = buttonClicked.parentElement.parentElement;

    var title = shopItem.querySelector('.shop-item-title').innerText;
    var price = parseFloat(shopItem.querySelector('td:nth-child(2)').innerText.replace('ل.س', ''));

    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');

    var cartRowContents = `
        <td class="cart-item-title">${title}</td>
        <td class="cart-item-price">${price} ل.س</td>
        <td>
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" onclick="removeCartItem()">حذف</button>
        </td>
        <td class="cart-item-total">${price} ل.س</td>
    `;

    cartRow.innerHTML = cartRowContents;

    var cartTable = document.querySelector('.cart-items');
    cartTable.appendChild(cartRow);

    updateCartTotal();
}
function updateCartTotal() {
    var cartRows = document.querySelectorAll('.cart-row');

    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var row = cartRows[i];
        var priceElement = row.querySelector('.cart-item-price');
        var quantityElement = row.querySelector('.cart-quantity-input');
        var totalElement = row.querySelector('.cart-item-total');

        var price = parseFloat(priceElement.innerText.replace(' ل.س', ''));
        var quantity = quantityElement.valueAsNumber;

        total += price * quantity;

        totalElement.innerText = (price * quantity) + ' ل.س';
    }

    var totalElement = document.querySelector('.cart-total-price');
    totalElement.innerText = total + ' ل.س';
    ready();
}


function addItemToCart(title){
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for (i = 0; i< cartItemNames.length ; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item already has added to the cart!');
            return
        }
    }
    var cartRowContents = `

        <td class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>                  
        </td>
        
        <td class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1" style="width: 50px">
            <button class="btn btn-danger" type="button">Remove</button>
        </td>        
    `;
     
            
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
function validateEmail(emailInput) {
    var email = emailInput.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("الرجاء إدخال بريد إلكتروني صحيح.");
        emailInput.style.borderColor = 'red'; // جعل إطار الإدخال أحمر
        return false;
    } else {
        emailInput.style.borderColor = ''; // إعادة تعيين لون الإطار إلى الافتراضي
        return true;
    }
}
function validatePhoneNumber(phoneInput) {
    var phoneNumber = phoneInput.value;
    var invalidPrefixes = ['090', '091', '092', '097'];
    var phoneRegex = /^09\d{8}$/;

    if (!phoneRegex.test(phoneNumber) || invalidPrefixes.includes(phoneNumber.substring(0, 3))) {
        alert("الرجاء إدخال رقم هاتف صحيح (يجب أن يكون 10 أرقام ويبدأ بـ 09 وغير مشمول بالأرقام المحظورة).");
        phoneInput.style.borderColor = 'red'; // جعل إطار الإدخال أحمر
        return false;
    } else {
        phoneInput.style.borderColor = ''; // إعادة تعيين لون الإطار إلى الافتراضي
        return true;
    }
}
function validateNationalID(nationalIDInput) {
    var nationalID = nationalIDInput.value;
    var nationalIDRegex =/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14)\d{9}$/;

    if (!nationalIDRegex.test(nationalID)) {
        alert("الرجاء إدخال رقم وطني صحيح (يجب أن يكون 14 رقمًا وتبدأ الخانتان اليسرى برمز المحافظة).");
        nationalIDInput.style.borderColor = 'red'; // جعل إطار الإدخال أحمر
        return false;
    } else {
        nationalIDInput.style.borderColor = ''; // إعادة تعيين لون الإطار إلى الافتراضي
        return true;
    }
}


function buy() {
    // تحقق من صحة Captcha
    var response = grecaptcha.getResponse();
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('mobile-number');
    var nationalIDInput = document.getElementById('national-id');

    if (response.length === 0&&false) {
        alert("الرجاء إثبات أنك لست روبوتًا!");
    } else if (!validateEmail(emailInput)) {
        // التحقق من البريد الإلكتروني، إذا كان غير صحيح قفل عملية الشراء
        alert("الرجاء إدخال بريد إلكتروني صحيح قبل الشراء.");
    } else if (!validatePhoneNumber(phoneInput)) {
        // التحقق من رقم الهاتف، إذا كان غير صحيح قفل عملية الشراء
        alert("الرجاء إدخال رقم هاتف صحيح قبل الشراء.");
    } else if (!validateNationalID(nationalIDInput)) {
        // التحقق من الرقم الوطني، إذا كان غير صحيح قفل عملية الشراء
        alert("الرجاء إدخال رقم وطني صحيح قبل الشراء.");
    }else {
        // استمر في عملية الشراء
        // ... الكود الخاص بك هنا ...
        alert('تم الشراء بنجاح!');
    }
}


 
