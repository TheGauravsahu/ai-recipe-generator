"use client"

import React, { useState, useEffect } from "react";
import { Clock, Utensils, ChefHat, Flame, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function RecipeDetails({ recipeId }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (loading)
    return (
      <div className="min-h-screen bg-green-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        >
          <ChefHat className="text-green-500" size={64} />
        </motion.div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-green-950 text-green-100 flex items-center justify-center p-8">
        <div className="text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold">Failed to Load Recipe</h2>
          <p className="text-green-300">{error.message}</p>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-green-950 overflow-hidden p-8 text-green-100">
      {/* Light Beam Effect */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto bg-green-900/30 backdrop-blur-lg shadow-2xl rounded-2xl"
      >
        {/* Recipe Header */}
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-t-2xl opacity-70"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-green-950/80 to-transparent">
            <h1 className="text-4xl font-bold text-green-200">
              {recipe.title}
            </h1>
          </div>
        </div>

        {/* Recipe Meta Information */}
        <div className="grid md:grid-cols-3 gap-4 p-6 bg-green-900/30">
          <div className="flex items-center text-green-300">
            <Clock className="mr-2 text-green-500" />
            <span>Prep: {recipe.preparationMinutes || 15} mins</span>
          </div>
          <div className="flex items-center text-green-300">
            <Utensils className="mr-2 text-green-500" />
            <span>Cook: {recipe.cookingMinutes || 30} mins</span>
          </div>
          <div className="flex items-center text-green-300">
            <Flame className="mr-2 text-green-500" />
            <span>Servings: {recipe.servings}</span>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-green-200 mb-4">
            Ingredients
          </h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {recipe.extendedIngredients.map((ingredient, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 10 }}
                className="text-green-300 flex items-center"
              >
                <div className="w-2 h-2 bg-green-500 mr-2 rounded-full"></div>
                {ingredient.original}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="p-6 bg-green-900/30">
          <h2 className="text-2xl font-bold text-green-200 mb-4">
            Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-green-800/50 p-4 rounded-lg text-green-300"
              >
                <span className="font-bold text-green-500 mr-2">
                  Step {step.number}
                </span>
                {step.step}
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
