function Cart({ cart, products, onRemoveFromCart, onCheckout }) {
  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h2 className="h5 mb-0">Cesta de la Compra</h2>
      </div>
      <div className="card-body">
        <ul className="list-group mb-3">
          {cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return (
              <li key={item.id} className="list-group-item d-flex align-items-center">
                <img
                  src={product.image}
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
        <p><strong>Total:</strong> ${getTotal()}</p>
        <button className="btn btn-success w-100" onClick={onCheckout}>
          Realizar Pedido
        </button>
      </div>
    </div>
  );
}

export default Cart;
