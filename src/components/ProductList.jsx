import ProductCard from './ProductCard';

function ProductList({ categories, products, onAddToCart }) {
  return (
    <div className="container">
      {categories.map(category => {
        const filteredProducts = products.filter(p => p.categoryId === category.id);

        return (
          <div key={category.id} className="mb-5">
            <h3
              className="category-title bg-light p-2 rounded border mb-3"
              data-category={category.id}
            >
              {category.name}
            </h3>
            <div className="row">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
