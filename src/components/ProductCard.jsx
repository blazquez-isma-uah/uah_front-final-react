import { useState, useEffect } from 'react';

function ProductCard({ product, onAddToCart }) {
    const { id, name, description, price, stock, images } = product;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hovering, setHovering] = useState(false);

    // Cambia la imagen al pasar el ratón
    useEffect(() => {
        let interval;
        if (hovering && images.length > 1) {
          interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % images.length);
          }, 1000);
        } else {
          setCurrentImageIndex(0); // volver a imagen principal al salir
        }
    
        return () => clearInterval(interval);
      }, [hovering, images]);

    const handleClick = () => {
      if (stock > 0) onAddToCart(id);
    };
  
    return (
      <div className="col-md-4 product-card mb-4">
        <div className="card h-100">
            <div
            className="product-image-wrapper position-relative"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            >
            <img
                src={images[currentImageIndex]}
                alt={name}
                className={`card-img-top product-img ${stock === 0 ? 'opacity-50' : ''}`}
                style={{ objectFit: 'contain', height: '150px' }}
            />

            {hovering && (
                <div className="image-overlay">
                <span><i className="bi bi-arrow-repeat"/>  <i className="bi bi-camera"></i> </span>
                </div>
            )}
            </div>
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
  