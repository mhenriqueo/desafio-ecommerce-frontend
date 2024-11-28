import React from 'react';
import CategoryTable from './CategoryTable';

function CategoryList({ categories, setCategories, onDelete, onEdit }) {
  return (
    <div className="category-list">
      <CategoryTable categories={categories} setCategories={setCategories} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default CategoryList;