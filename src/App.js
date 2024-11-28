import React, { useState, useEffect } from 'react';
import './styles/App.css';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import ProductSearch from './components/ProductSearch';
import { getProducts, createProduct, deleteProduct, updateProduct, getProductByTitle } from './services/productService';
import { getOwners } from './services/ownerService';
import { getCategories } from './services/categoryService';

function App() {
  const [products, setProducts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productData, setProductData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getProducts().then(response => setProducts(response.data));
    getOwners().then(response => setOwners(response.data));
    getCategories().then(response => setCategories(response.data));
  }, []);

  const handleCreateProduct = (product) => {
    createProduct(product).then(response => {
      setProducts([...products, response.data]);
      setShowProductModal(false);
    });
  };

  const handleEditProduct = (product) => {
    updateProduct(product.id, product)
      .then(response => {
        const updatedProducts = products.map(p =>
          p.id === product.id ? response.data : p
        );
        setProducts(updatedProducts);
        setShowProductModal(false);
      });
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId).then(() => {
      setProducts(products.filter(product => product.id !== productId));
    });
  };

  const handleSearch = () => {
    getProductByTitle(searchQuery).then(response => setProducts(response.data));
  };

  const handleEditClick = (product) => {
    const category = categories.find(cat => cat.title === product.categoryTitle);
    const owner = owners.find(own => own.name === product.ownerName);

    setProductData({
      ...product,
      categoryId: category ? category.id : '',
      ownerId: owner ? owner.id : '',
    });

    setIsEditMode(true);
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setProductData({});
    setIsEditMode(false);
  };

  const handleAddProductClick = () => {
    setProductData({});
    setIsEditMode(false);
    setShowProductModal(true);
  };

  return (
    <div className="App">
      <div className="header-container">
        <h1>Catálogo de Produtos</h1>
      </div>

      <div className="product-list-container">
        <div className="product-list-header">
          <div className="add-product-button-container">
            <button onClick={handleAddProductClick} className="button">
              Cadastrar Produto
            </button>
          </div>

          <ProductSearch
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onSearchQueryChange={setSearchQuery}
          onEdit={handleEditClick}
        />

        {showProductModal && (
          <ProductModal
            show={showProductModal}
            onClose={handleCloseModal}
            onSubmit={isEditMode ? handleEditProduct : handleCreateProduct}
            owners={owners}
            categories={categories}
            product={productData}
            isEditMode={isEditMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;