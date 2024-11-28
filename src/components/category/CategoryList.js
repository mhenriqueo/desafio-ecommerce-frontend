import React from 'react';
import CategoryTable from './CategoryTable';

function CategoryList({ categories, onDelete, onEdit }) {
  return (
    <div className="category-list">
      <CategoryTable categories={categories} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default CategoryList;