function CartProduct({ item, product, onRemove }) {
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
            onClick={() => onRemove(item.id)}
        >
            <i className="bi bi-trash3"></i> Eliminar
        </button>
    </li>
  );
}

export default CartProduct;