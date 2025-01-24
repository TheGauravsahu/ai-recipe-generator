import RecipeDetails from "@/components/RecipeDetials";

export default function RecipePage({ params }) {
  return <RecipeDetails recipeId={params.id} />;
}
