const STORAGE_KEY = "products"
const CART_KEY = "cart"

function saveProducts(products) {
  const productsText = JSON.stringify(products)
  localStorage.setItem(STORAGE_KEY, productsText)
}

function getProducts() {
  const savedText = localStorage.getItem(STORAGE_KEY)
  if(!savedText){
    return []
  }
  const products = JSON.parse(savedText)
  return products
}
function saveCart(cart){
  const cartText = JSON.stringify(cart)
  localStorage.setItem(CART_KEY,cartText)
}
function getCart(){
  const savedText = localStorage.getItem(CART_KEY)
  if(!savedText){
    return[]
  }
  const cart = JSON.parse(savedText)
  return cart
}