import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
  const { recipeId } = params;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    const recipe = response.data;
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe details" },
      { status: 500 }
    );
  }
}
