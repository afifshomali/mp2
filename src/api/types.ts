export interface Meal {
  id: string;               
  name: string;             
  thumbnail: string;       
  instructions?: string;    

  
  youtube?: string;         
  source?: string;         
  area?: string;            
  category?: string;        
  tags?: string[];          

  
  ingredients: string[];
  measures: string[];

  
  ingredientCount: number;
}

export interface Category {
  name: string;
}

export interface Area {
  name: string;
}

export interface Ingredient {
  name: string;
  thumbnail: string;
}