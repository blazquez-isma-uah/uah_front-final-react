import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import data from './data/data.json';
import './App.css';
import './styles.css';


function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  // Cargar productos y categorías
  useEffect(() => {
    setCategories(data.categories);
    // Clonamos los productos y nos aseguramos de que el stock sea un número
    const clonedProducts = data.products.map(p => ({
      ...p,
      stock: Number(p.stock)
    }));
    setProducts(clonedProducts);
  }, []);

  // Agregar producto al carrito
  const handleAddToCart = (productId) => {
    const updatedProducts = [...products];
    const product = updatedProducts.find(p => p.id === productId);

    if (product && product.stock > 0) {
      product.stock--;

      const existingItem = cart.find(item => item.id === productId);
      let updatedCart;

      if (existingItem) {
        updatedCart = cart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
      }

      setProducts(updatedProducts);
      setCart(updatedCart);
    }
  };

  // Eliminar producto del carrito
  const handleRemoveFromCart = (productId) => {
    const updatedCart = [...cart];
    const updatedProducts = [...products];

    const cartItemIndex = updatedCart.findIndex(item => item.id === productId);
    const product = updatedProducts.find(p => p.id === productId);

    if (cartItemIndex > -1 && product) {
      const item = updatedCart[cartItemIndex];
      item.quantity--;

      product.stock++;

      if (item.quantity === 0) {
        updatedCart.splice(cartItemIndex, 1);
      }

      setCart(updatedCart);
      setProducts(updatedProducts);
    }
  };

  // Finalizar compra
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Compra realizada. Total: $${total.toFixed(2)}`);
    setCart([]);
  };

  return (
    <div className="App">
      <h1 className="text-center mt-3">Tienda Online</h1>
      <div className="container d-flex mt-4 gap-4">
        <div className="w-70">
          <ProductList
            categories={categories}
            products={products}
            onAddToCart={handleAddToCart}
          />
        </div>
        <div className="w-30">
          <Cart
            cart={cart}
            products={products}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
