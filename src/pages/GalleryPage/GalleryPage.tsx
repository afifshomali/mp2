import React, { useEffect, useState } from 'react';
import styles from './GalleryPage.module.css';
import { filterMealsByArea } from '../../api/mealApi';
import { Meal } from '../../api/types';
import { SimpleGrid, Card, Image, Text, Group, Container } from '@mantine/core';

interface GalleryPageProps {
  areasList: { name: string }[];
}

function GalleryPage({ areasList }: GalleryPageProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');

  useEffect(() => {
    if (areasList && areasList.length > 0) {
      const defaultCat = areasList[0].name;
      setCurrentCategory(defaultCat);
      filterMealsByArea(defaultCat).then((filtered) => {
        setMeals(filtered);
      });
    }
  }, [areasList]);

  const handleCategoryClick = (catName: string) => {
    if (catName === currentCategory) return;
    setCurrentCategory(catName);
    filterMealsByArea(catName).then((filtered) => {
      console.log('filterMealsByArea result:', filtered);
      setMeals(filtered);
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Gallery</h1>
        <Group wrap="wrap" className={styles.filterGroup}>
          {areasList.map((areaObj, idx) => (
            <button
              key={idx}
              className={`${styles.filterButton} ${
                areaObj.name === currentCategory ? styles.activeFilter : ''
              }`}
              onClick={() => handleCategoryClick(areaObj.name)}
            >
              {areaObj.name}
            </button>
          ))}
        </Group>
      </div>

      <Container size="md" className={styles.gridContainer}>
        <SimpleGrid cols={3} spacing="md" className={styles.grid}>
          {meals.map((meal) => (
            <Card key={meal.id} className={styles.card} withBorder>
              <div className={styles.imageWrapper}>
                <Image
                  src={meal.thumbnail}
                  alt={meal.name}
                  className={styles.thumbImage}
                />
                <div className={styles.overlay}>
                  <Text className={styles.overlayText}>{meal.name}</Text>
                </div>
              </div>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default GalleryPage;
