import CartProduct from "./CartProduct";

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
                <CartProduct
                    key={item.id}
                    item={item}
                    product={product}
                    onRemove={onRemoveFromCart}
                />
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
