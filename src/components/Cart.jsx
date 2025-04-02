function Cart({ cart, products, onRemoveFromCart, onCheckout }) {
  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  return (
    <div id="cart-section">
      <h2>Cesta de la Compra</h2>
      <ul id="cart-list" className="list-group">
          {cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return (
              <li key={item.id} className="list-group-item d-flex align-items-center">
                <img
                  src={product.images[0]}
                  alt={item.name}
                  className="me-2"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <span>
                  <strong>{item.name}</strong> (x{item.quantity}) – ${item.price * item.quantity}
                </span>
                <button
                  className="btn btn-sm btn-danger ms-auto"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  <i className="bi bi-trash3"></i> Eliminar
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-3">
            <strong>Total: <span id="cart-total"> ${getTotal()}</span></strong>
        </div>
        <button id="checkout-button" className="btn btn-success mt-3" onClick={onCheckout}>
          Realizar Pedido
        </button>
    </div>
  );
}

export default Cart;
