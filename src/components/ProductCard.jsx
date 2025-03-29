function ProductCard({ product, onAddToCart }) {
    const { id, name, description, price, stock, image } = product;
  
    const handleClick = () => {
      if (stock > 0) onAddToCart(id);
    };
  
    return (
      <div className="col-md-4 product-card mb-4">
        <div className="card h-100">
          <img
            src={image}
            alt={name}
            className="card-img-top product-img"
            style={{ objectFit: 'cover', height: '200px' }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{name}</h5>
            <p className="text-muted">
              Código: <strong>{id}</strong>
            </p>
            <p className="card-text">{description}</p>
            <p className="text-success">
              <strong>${price.toFixed(2)}</strong>
            </p>
            <p className="text-muted">Stock: <span id={`stock-${id}`}>{stock}</span></p>
            <button
              className={`btn mt-auto ${stock === 0 ? 'btn-secondary' : 'btn-primary'}`}
              onClick={handleClick}
              disabled={stock === 0}
              data-id={id}
            >
              {stock === 0 ? 'Agotado' : 'Agregar a la cesta'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductCard;
  