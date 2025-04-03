import { useState } from 'react';
import data from '../data/data.json';

function AdminPanel({ categories, setCategories, products, setProducts }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  const [newCategory, setNewCategory] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    code: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    images: []
  });

  const handleLogin = () => {
    if (password === '123456') {
      setIsAdmin(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;

    if (categories.some(c => c.name.toLowerCase() === newCategory.toLowerCase())) {
        alert('Categoría ya existe');
        return;
    }

    const id = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const updated = [...categories, { id, name: newCategory }];
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
    setNewCategory('');
  };

  const handleAddProduct = () => {
    const {
      name, code, description, price, stock, categoryId, images
    } = newProduct;

    if (!name || !code || !description || !price || !stock || !categoryId || images.length === 0) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (products.some(p => p.id === parseInt(code))) {
      alert('Código de producto duplicado');
      return;
    }

    const newProd = {
      id: parseInt(code),
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      categoryId: parseInt(categoryId),
      images
    };

    const updated = [...products, newProd];
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));

    setNewProduct({
      name: '',
      code: '',
      description: '',
      price: '',
      stock: '',
      categoryId: '',
      images: []
    });

    alert('Producto agregado');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const paths = files.map(file => `img/${file.name}`);
    setNewProduct(prev => ({ ...prev, images: paths }));
  };

  const handleResetStore = () => {
    if (!window.confirm('¿Estás seguro de que quieres resetear la tienda?')) return;
  
    localStorage.setItem('products', JSON.stringify(data.products.map(p => ({
      ...p,
      stock: Number(p.stock)
    }))));
  
    localStorage.setItem('categories', JSON.stringify(data.categories));
  
    setProducts(data.products.map(p => ({ ...p, stock: Number(p.stock) })));
    setCategories(data.categories);
  
    alert('La tienda ha sido reseteada correctamente.');
  };
  

  const handleExportStore = () => {
    const dataToExport = {
      categories,
      products
    };
  
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tienda_exportada.json';
    link.click();
  
    URL.revokeObjectURL(url);
  };
  

  const handleImportStore = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
  
        if (!imported.categories || !imported.products) {
          alert('El archivo JSON no tiene la estructura esperada.');
          return;
        }
  
        localStorage.setItem('categories', JSON.stringify(imported.categories));
        localStorage.setItem('products', JSON.stringify(imported.products));
  
        setCategories(imported.categories);
        setProducts(imported.products);
  
        alert('Tienda importada correctamente.');
      } catch (err) {
        alert('Error al leer el archivo JSON.');
        console.error(err);
      }
    };
  
    reader.readAsText(file);
  };
  

  if (!isAdmin) {
    return (
      <div className="card p-4">
        <h4>Acceso de Administrador</h4>
        <input
          type="password"
          className="form-control mb-3"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Introduce la contraseña"
        />
        <button className="btn btn-primary" onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="card p-4 mt-4">
      <h4>Panel de Administración</h4>
      <div className="d-flex justify-content-center align-items-center px-4 m-3">
        <button className="btn btn-danger me-3" onClick={handleResetStore}><i className="bi bi-arrow-clockwise"></i> Resetear Tienda</button>
        <button className="btn btn-success me-3" onClick={handleExportStore}><i className="bi bi-file-earmark-arrow-down"></i> Exportar Tienda</button>
        <div className="custom-file-upload"> 
        <label htmlFor="fileInput" className="btn btn-primary">Importar Tienda (.json)</label>
        <input
            id="fileInput"
            type="file"
            className="d-none"
            onChange={handleImportStore}
            accept=".json"
        />
        </div>
      </div>
      <div className="m-4">
        <h5>Añadir Categoría</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nombre de la categoría"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleAddCategory}>Agregar Categoría</button>
      </div>

      <div className="m-4">
        <h5>Añadir Producto</h5>
        <input className="form-control mb-2" placeholder="Nombre" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} />
        <input className="form-control mb-2" placeholder="Código" value={newProduct.code} onChange={e => setNewProduct(p => ({ ...p, code: e.target.value }))} />
        <input className="form-control mb-2" placeholder="Descripción" value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} />
        <input type="number" className="form-control mb-2" placeholder="Precio" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} />
        <input type="number" className="form-control mb-2" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct(p => ({ ...p, stock: e.target.value }))} />
        <select className="form-select mb-2" value={newProduct.categoryId} onChange={e => setNewProduct(p => ({ ...p, categoryId: e.target.value }))}>
          <option value="">Seleccione categoría</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input type="file" className="form-control mb-2" multiple onChange={handleImageUpload} />
        <button className="btn btn-secondary" onClick={handleAddProduct}>Agregar Producto</button>
      </div>
    </div>
  );
}

export default AdminPanel;
