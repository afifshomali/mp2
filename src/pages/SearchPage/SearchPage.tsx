// src/pages/SearchPage/SearchPage.tsx
import React, { useState } from 'react';
import styles from './SearchPage.module.css';
import { SearchBox } from '../../components/SearchBox/SearchBox';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'numIngredients'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    // TODO: filter meals by name
  };

  const handleSortKeyChange = (key: 'name' | 'numIngredients') => {
    setSortKey(key);
    // TODO: sort meals by chosen key
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    // TODO: sort meals by chosen order
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search for Meals</h1>

      <SearchBox
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        sortKey={sortKey}
        onSortKeyChange={handleSortKeyChange}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
      />

    </div>
  );
}

export default SearchPage;
