import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { ingredients } = await request.json();

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients: ingredients.join(','),
          apiKey: process.env.SPOONACULAR_API_KEY,
          number: 5, // Number of recipes to return
        },
      }
    );

    const recipes = response.data;
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}