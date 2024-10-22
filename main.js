// 1.เก็บค่าจากหน้า html มาสร้างตัวแปร
const productNameInput = document.getElementById("productname-input");
const priceInput = document.getElementById("price-input");
const urlInput = document.getElementById("image-input");
const createBnt = document.getElementById("create-product");
const productList = document.getElementById("Product-list");
const cartList = document.getElementById("Cart-list")
const totalPriceElement = document.getElementById("cal-price");



//2. สร้าง Event 
let products = [];
let cart = [];
createBnt.addEventListener("click", () => {
    const productName = productNameInput.value.trim();
    const price = priceInput.value;
    const imageUrl = urlInput.value;

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!isNaN(price)) {
        // ราคาเป็นตัวเลข
    } else {
        alert("ราคาต้องเป็นตัวเลขเท่านั้น");
        return; // หยุดการทำงานของฟังก์ชัน
    }

    const imageRegex = /\.(jpg|png|gif)$/i;
    if (imageRegex.test(imageUrl)) {
        // URL รูปภาพถูกต้อง
    } else {
        alert("URL รูปภาพต้องมีนามสกุล .jpg, .png หรือ .gif");
        return;
    }

    // ถ้าผ่านการตรวจสอบทั้งหมด
    if (productName && price && imageUrl) {
        const product = {
            id: Date.now(),
            name: productName,
            imageUrl: imageUrl,
            price: price
        };
        products.push(product); //เอาค่าinput ไปใส่ array products
        renderProducts(products);
        productNameInput.value = ""; //สุดท้าย ให้ค่า input ในกล่อง หายไป
        priceInput.value = "";
        urlInput.value = "";
    }
});
    
// 3. สร้าง function
      //แสดง จากโครงที่วางไว้
      // 3.1 แสดงสินค้าที่ป้อนข้อมูล
      function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = 
            `<img src="${product.imageUrl}">     
             <p>Product: ${product.name}  Price: $${product.price}</p>                     
            `;
            productList.appendChild(productElement); // วางโครงสร้าง
            
            // ช่อง Add
            const addToCartBtn = document.createElement("input");
            addToCartBtn.type ="checkbox";
            productElement.appendChild(addToCartBtn);           
            addToCartBtn.addEventListener("click", () => addToCart(product.id)); //function เมื่อกด box ตามid
            // ปุ่ม remove
            const removeBtn = document.createElement("button");
            productElement.appendChild(removeBtn);
            removeBtn.textContent = "Remove"; //ให้แสดงข้อความบนปุ่มเป็น Remove
            removeBtn.addEventListener("click", () => removeFromList(product.id)); //function เมื่อกด remove ลบตามid

        });
    }


        // 3.2 addToCart /removeFromList       

        function addToCart(id) {
            const selectedproduct = products.find(p => p.id === id); // วนรอบ array products หา id ตรงกับ idที่คลิกปุ่ม Add to Cart
            cart.push(selectedproduct); 
            renderCart();               // เรียกใช้ function
            calculatePrice();      // เรียกใช้ function
          }

        function removeFromList(id) {
            products = products.filter(product => product.id !== id); // วนรอบ array products ถ้า id ไม่ตรงกับ idที่คลิกปุ่มลบ ให้แสดงข้อมูล, product คือ object ที่แทนสินค้าหนึ่ง
            renderProducts();            
          }


        // 3.3 แสดงสินค้าในตะกร้า
        function renderCart() {
            cartList.innerHTML = '';
            cart.forEach(product => {
              const cartItem = document.createElement('span');
              cartItem.innerHTML = `
                <img src="${product.imageUrl}">     
                <p>${product.name}  $${product.price}</p>
                <button onclick="removeFromCart(${product.id})">Remove</button>
              `;

              cartList.appendChild(cartItem); // วางโครงสร้าง
              
            });
          }
          // 3.4 remove from cart
          function removeFromCart(id) {
            cart = cart.filter(product => product.id !== id);
            renderCart();
            calculatePrice();
          }
          
          // 3.5 Calcuation
          function calculatePrice() {
            const total = cart.reduce((sum, product) => sum + parseFloat(product.price), 0);
            totalPriceElement.textContent = `You have to  pay: ${total}`;
          }
