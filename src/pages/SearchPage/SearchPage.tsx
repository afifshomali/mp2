// src/pages/SearchPage/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import styles from './SearchPage.module.css';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import { searchMealByFirstLetter } from '../../api/mealApi';
import { Meal } from '../../api/types';
import { Card, Image, Text, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMealList } from '../../components/MealListContext/MealListContext';



function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'numIngredients'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [firstLetter, setFirstLetter] = useState('');
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const navigate = useNavigate();
  const { setMealList } = useMealList();

  useEffect(() => {
    setMealList(filteredMeals);
  }, [filteredMeals, setMealList]);

  // API calls with first letter only when needed
  useEffect(() => {
    async function fetchMeals() {
      if (firstLetter === '') return;
      try {
        const results = await searchMealByFirstLetter(firstLetter);
        setAllMeals(results);
      } catch (err) {
        console.error('Error fetching meals:', err);
      }
    }
    fetchMeals();
  }, [firstLetter]);

  // Filtering & Sorting Locally
  useEffect(() => {
    let meals = [...allMeals];

    if (searchTerm) {
      meals = meals.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    meals.sort((a, b) => {
      let valA: string | number;
      let valB: string | number;

      if (sortKey === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else {
        valA = a.ingredientCount;
        valB = b.ingredientCount;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredMeals(meals);
  }, [searchTerm, sortKey, sortOrder, allMeals]);

  const handleSearchTermChange = (term: string) => {
    if (term.length > 0) {
      const newFirstLetter = term[0].toLowerCase();
      if (newFirstLetter !== firstLetter) {
        setFirstLetter(newFirstLetter);
      }
    }
    if (term.length === 0) {
      setFirstLetter('');
      setAllMeals([]);
      setFilteredMeals([]);
    }

    setSearchTerm(term);
  };

  const handleSortKeyChange = (key: 'name' | 'numIngredients') => {
    setSortKey(key);
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const handleCardClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
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

      <div className={styles.results}>
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <Card
              key={meal.id}
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              onClick={() => handleCardClick(meal.id)}
              className={styles.mealCard}
            >
              <Group wrap="nowrap" align="center">
                <Image
                  src={meal.thumbnail + '/preview'}
                  alt={meal.name}
                  className={styles.mealImage}
                />
                <div>
                  <Text fw={500} size="xl">{meal.name}</Text>
                  <Text size="md" c="dimmed">
                    Ingredients: {meal.ingredientCount}
                  </Text>
                </div>
              </Group>
            </Card>
          ))
        ) : (
          searchTerm.trim().length > 1 && (
            <Text fw={500} size="xl" ta="center">
              No results found
            </Text>
          )
        )}
      </div>

    </>
  );
}

export default SearchPage;
