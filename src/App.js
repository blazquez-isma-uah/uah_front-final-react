import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import data from './data/data.json';
import AdminPanel from './components/AdminPanel';
import './styles.css';
import './App.css';



function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Cargar productos y categorías
  useEffect(() => {

    const storedProducts = localStorage.getItem('products');
    const storedCategories = localStorage.getItem('categories');
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(data.categories);
      // Guardar categorías en localStorage
      localStorage.setItem('categories', JSON.stringify(data.categories));
    }

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Clonamos los productos y nos aseguramos de que el stock sea un número
      const clonedProducts = data.products.map(p => ({
        ...p,
        stock: Number(p.stock)
      }));
      setProducts(clonedProducts);

      // Guardamos los productos en localStorage
      localStorage.setItem('products', JSON.stringify(clonedProducts));
    }

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

      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 1000);
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
      <div className="d-flex justify-content-between align-items-center px-4 mt-3">
        <h1 className="m-0">Tienda Online</h1>
        <button className="btn btn-outline-secondary" onClick={() => setShowAdminPanel(!showAdminPanel)}>
          {showAdminPanel ? (<><i className="bi bi-x-circle"></i> Admin</>) 
          : (<><i className="bi bi-gear"></i> Admin</>)
          }
        </button>
      </div>
      {showAdminPanel ? 
      (
        <div className="container mt-4">
          <AdminPanel
            products={products}
            setProducts={setProducts}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      )
    : (
      <div className="container mt-4">
        <div className="row">
          <div className='col-md-8'>
            <ProductList
              categories={categories}
              products={products}
              onAddToCart={handleAddToCart}
            />
          </div>
          <div className='col-md-4'>
            <Cart
              cart={cart}
              products={products}
              onRemoveFromCart={handleRemoveFromCart}
              onCheckout={handleCheckout}
            />
            { showNotification && (
              <div className="alert alert-success notification">
                <p>Producto agregado al carrito</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
    }
    </div>
  );



}

export default App;
