import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchMealById } from '../../api/mealApi'; // Adjust the import path as necessary
import { Meal } from '../../api/types'; // Adjust the import path as necessary
import { Container, SimpleGrid, Text, Title, Button, Loader } from '@mantine/core';
import { MdIntegrationInstructions } from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa';
import styles from './DetailPage.module.css';
import { useMealList } from '../../components/MealListContext/MealListContext';




export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { mealList } = useMealList();
  const currentIndex = mealList.findIndex(m => m.id === id);

  const goPrev = () => {
    if (currentIndex > 0) {
      const prevMeal = mealList[currentIndex - 1];
      navigate(`/detail/${prevMeal.id}`);
    } else {
      const lastMeal = mealList[mealList.length - 1];
      navigate(`/detail/${lastMeal.id}`);
    }
  };  

  const goNext = () => {
    if (currentIndex < mealList.length - 1) {
      const nextMeal = mealList[currentIndex + 1];
      navigate(`/detail/${nextMeal.id}`);
    } else {
      const firstMeal = mealList[0];
      navigate(`/detail/${firstMeal.id}`);
    }
  };

  useEffect(() => {
    const fetchMealDetails = async () => {
      if (id) {
        try {
          const fetchedMeal = await searchMealById(id);
          setMeal(fetchedMeal);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMealDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Container my="md" className={styles.container}>
        <div className={styles.loaderWrap}>
          <Loader />
        </div>
      </Container>
    );
  }

  if (!meal) {
    return <Text>No meal found with ID: {id}</Text>;
  }

  return (
    <Container my="md" className={styles.container}>
      {/* Navigation arrows (centered, no functionality for now) - moved above the title */}
      <div className={styles['detail-nav-arrows']}>
        <div className={styles['detail-nav-inner']}>
          <Button variant="outline" color="gray" aria-label="Previous" onClick={goPrev}>
            ◀
          </Button>
          <Button variant="outline" color="gray" aria-label="Next" onClick={goNext}>
            ▶
          </Button>
        </div>
      </div>

  <Title order={1} className={styles.pageTitle}>{meal.name}</Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" className={styles.equalGrid}>
        {/* Left Column: image + two boxes under it (Ingredients & Details) */}
        <div className={styles.leftColumn}>
          <div className={styles.imageWrapper}>
            <img src={meal.thumbnail} alt={meal.name} className={styles.thumbImage} />
          </div>

          <div className={styles.underImageGrid}>
            <div className={styles.secondaryBox}>
              <Title order={3} className={styles.sectionTitle}>Ingredients</Title>
              <ul>
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient} {meal.measures[index] && `(${meal.measures[index]})`}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.secondaryBox}>
              <Title order={3} className={styles.sectionTitle}>Details</Title>
                <Text><strong>Category:</strong> {meal.category}</Text>
              <Text><strong>Area:</strong> {meal.area}</Text>
              {meal.tags && meal.tags.length > 0 && (
                <div className={styles.tagsRow}>
                  <Text component="span" className={styles.tagsLabel}><strong>Tags:</strong></Text>
                  <div className={styles.tagsList}>
                    {meal.tags.map((tag: string, idx: number) => (
                      <span key={idx} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                )}

              {(meal.source || meal.youtube) && (
                <div className={styles.linksRow}>
                  <Text component="span" className={styles.linksLabel}><strong>Links:</strong></Text>
                  <div className={styles.linksList}>
                    {meal.source && (
                      <a
                        href={meal.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkItem}
                      >
                        <MdIntegrationInstructions className={styles.icon} />
                        <span>Recipe</span>
                      </a>
                    )}

                    {meal.youtube && (
                      <a
                        href={meal.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkItem}
                      >
                        <FaYoutube className={styles.icon} />
                        <span>Youtube</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Instructions */}
        <div className={styles.instructionsBox}>
          <Title order={2} className={styles.sectionTitle}>Instructions</Title>
          <Text className={styles.instructionsText}>{meal.instructions}</Text>
        </div>
      </SimpleGrid>

      {/* (previously rendered above the title) */}
    </Container>
  );
}

export default DetailPage;