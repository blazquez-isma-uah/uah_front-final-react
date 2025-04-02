import { useState } from 'react';
import ProductCard from './ProductCard';

function ProductList({ categories, products, onAddToCart }) {

    const [openCategories, setOpenCategories] = useState(
        categories.reduce((acc, category) => ({
            ...acc,
            [category.id]: true
        }), {} )
    );

    const toggleCategory = (categoryId) => {
        setOpenCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    }
    
  return (
    <div className="row">
      {categories.map(category => {
        const filteredProducts = products.filter(p => p.categoryId === category.id);

        return (
          <div key={category.id} className="row category-container mb-5">
            <h3
              className="category-title bg-light p-2 rounded border mb-3"
              onClick={() => toggleCategory(category.id)}
              style={{ cursor: 'pointer' }}
            >
              {category.name}
            </h3>
            <div className={`row category-container ${openCategories[category.id] ? 'expanded' : 'collapsed'}`}
                id={`category-${category.id}`}>
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
