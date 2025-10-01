import axios from 'axios';
import { Meal, Category, Area, Ingredient } from './types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

function parseMeal(raw: any): Meal {
  const ingredients: string[] = [];
  const measures: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingKey = `strIngredient${i}`;
    const measKey = `strMeasure${i}`;
    const ing = raw[ingKey];
    const meas = raw[measKey];
    if (ing && ing.trim() !== '') {
      ingredients.push(ing.trim());
      measures.push((meas ?? '').trim());
    }
  }

  let tags: string[] = [];
  if (raw.strTags) {
    tags = raw.strTags.split(',').map((t: string) => t.trim());
  }

  return {
    id: raw.idMeal,
    name: raw.strMeal,
    thumbnail: raw.strMealThumb,
    instructions: raw.strInstructions,
    youtube: raw.strYoutube,
    source: raw.strSource,
    area: raw.strArea,
    category: raw.strCategory,
    tags,
    ingredients,
    measures,
    ingredientCount: ingredients.length,
  };
}

export async function getCategories(): Promise<Category[]> {
  const url = `${BASE_URL}/list.php?c=list`;
  const resp = await axios.get(url);
  const data = resp.data;
  if (data && data.meals) {
    return data.meals.map((item: any) => ({
      name: item.strCategory,
    }));
  }
  return [];
}

export async function getAreas(): Promise<Area[]> {
  const url = `${BASE_URL}/list.php?a=list`;
  const resp = await axios.get(url);
  const data = resp.data;
  if (data && data.meals) {
    return data.meals.map((item: any) => ({
      name: item.strArea,
    }));
  }
  return [];
}

export async function getIngredients(): Promise<Ingredient[]> {
  const url = `${BASE_URL}/list.php?i=list`;
  const resp = await axios.get(url);
  const data = resp.data;
  if (data && data.meals) {
    return data.meals.map((item: any) => {
      const name = item.strIngredient;
      const thumbnail = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}.png`;
      return { name, thumbnail };
    });
  }
  return [];
}

export async function searchMealsByName(query: string): Promise<Meal[]> {
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
  const resp = await axios.get(url);
  const data = resp.data;
  if (data && data.meals) {
    return data.meals.map(parseMeal);
  }
  return [];
}

export async function searchMealByFirstLetter(letter: string): Promise<Meal[]> {
  const url = `${BASE_URL}/search.php?f=${encodeURIComponent(letter)}`;
  const resp = await axios.get(url);
  const data = resp.data;
  if (data && data.meals) {
    return data.meals.map(parseMeal);
  }
  return [];
}

export async function searchMealById(id: string): Promise<Meal | null> {
  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  const resp = await axios.get(url);
  const data = resp.data;
  if (data && data.meals && data.meals.length > 0) {
    return parseMeal(data.meals[0]);
  }
  return null;
}

export async function filterMealsByArea(area: string): Promise<Meal[]> {
  const url = `${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`;
  const resp = await axios.get(url);
  const data = resp.data;
  if (data && data.meals) {
    return data.meals.map((item: any) => ({
      id: item.idMeal,
      name: item.strMeal,
      thumbnail: item.strMealThumb
    }));
  }
  return [];  
}