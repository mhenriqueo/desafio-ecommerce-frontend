import React, { useState, useEffect } from 'react';
import './styles/App.css';
import CategoryList from './components/category/CategoryList';
import CategoryModal from './components/category/CategoryModal';
import ProductList from './components/product/ProductList';
import ProductModal from './components/product/ProductModal';
import ProductSearch from './components/product/ProductSearch';
import { getProducts, createProduct, deleteProduct, updateProduct, getProductByTitle } from './services/productService';
import { getCategories, createCategory, deleteCategory, updateCategory } from './services/categoryService';
import { getOwners } from './services/ownerService';

function App() {
  const [products, setProducts] = useState([]);
  const [owners, setOwners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [productData, setProductData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('product');

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

  const handleCreateCategory = (category) => {
    createCategory(category).then(response => {
      setCategories([...categories, response.data]);
      setShowCategoryModal(false);
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

  const handleEditCategory = (category) => {
    updateCategory(category.id, category)
      .then(response => {
        const updatedCategories = categories.map(c =>
          c.id === category.id ? response.data : c
        );
        setCategories(updatedCategories);
        setShowCategoryModal(false);
      });
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId).then(() => {
      setProducts(products.filter(product => product.id !== productId));
    });
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
    deleteCategory(categoryId).catch(error => {
      alert(error.message);
    });
  };

  const handleSearchProduct = () => {
    getProductByTitle(productSearchQuery).then(response => setProducts(response.data));
  };

  const handleEditProductClick = (product) => {
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

  const handleEditCategoryClick = (category) => {
    const owner = owners.find(own => own.name === category.ownerName);

    setCategoryData({
      ...category,
      ownerId: owner ? owner.id : '',
    });

    setIsEditMode(true);
    setShowCategoryModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setProductData({});
    setIsEditMode(false);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setCategoryData({});
    setIsEditMode(false);
  };

  const handleAddProductClick = () => {
    setProductData({});
    setIsEditMode(false);
    setShowProductModal(true);
  };

  const handleAddCategoryClick = () => {
    setCategoryData({});
    setIsEditMode(false);
    setShowCategoryModal(true);
  };

  return (
    <div className="App">
      <div className="header-container">
        <h1>Catálogo de Produtos</h1>
      </div>

      {/* Menu de navegação */}
      <div className="nav-container">
        <button
          onClick={() => setCurrentTab('product')}
          className={currentTab === 'product' ? 'active' : ''}
        >
          Produto
        </button>
        <button
          onClick={() => setCurrentTab('category')}
          className={currentTab === 'category' ? 'active' : ''}
        >
          Categoria
        </button>
      </div>

      {/* Exibir conteúdo baseado na aba selecionada */}
      {currentTab === 'product' && (
        <div className="product-list-container">
          <div className="product-list-header">
            <button onClick={handleAddProductClick} className="button">
              Cadastrar Produto
            </button>
            <ProductSearch
              searchQuery={productSearchQuery}
              onSearchQueryChange={setProductSearchQuery}
              onSearch={handleSearchProduct}
            />
          </div>

          <ProductList
            products={products}
            onDelete={handleDeleteProduct}
            onSearchQueryChange={setProductSearchQuery}
            onEdit={handleEditProductClick}
          />

          {showProductModal && (
            <ProductModal
              show={showProductModal}
              onClose={handleCloseProductModal}
              onSubmit={isEditMode ? handleEditProduct : handleCreateProduct}
              owners={owners}
              categories={categories}
              product={productData}
              isEditMode={isEditMode}
            />
          )}
        </div>
      )}

      {currentTab === 'category' && (
        <div className="category-list-container">
          <div className="category-list-header">
            <button onClick={handleAddCategoryClick} className="button">
              Cadastrar Categoria
            </button>
          </div>

          <CategoryList
            categories={categories}
            onDelete={handleDeleteCategory}
            onEdit={handleEditCategoryClick}
          />

          {showCategoryModal && (
            <CategoryModal
              show={showCategoryModal}
              onClose={handleCloseCategoryModal}
              onSubmit={isEditMode ? handleEditCategory : handleCreateCategory}
              owners={owners}
              category={categoryData}
              isEditMode={isEditMode}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;