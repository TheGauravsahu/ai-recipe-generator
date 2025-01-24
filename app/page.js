"use client";

import React, { useState } from "react";
import { Search, ChefHat, Cookie, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredients.split(",").map((item) => item.trim()),
        }),
      });

      const data = await response.json();
      if (data.recipes) {
        setRecipes(data.recipes);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-green-950 overflow-hidden p-8 text-green-100">
      {/* Light Beam Effect */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto bg-green-900/30 backdrop-blur-lg shadow-2xl rounded-2xl p-8"
      >
        <div className="flex items-center mb-6">
          <ChefHat className="text-green-400 mr-4" size={48} />
          <h1 className="text-4xl font-bold text-green-200">
            AI Recipe Generator
          </h1>
        </div>

        <p className="text-green-300 mb-4">
          Enter the ingredients you have at home (comma-separated):
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-center">
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., chicken, rice, tomatoes"
              className="flex-grow px-4 py-3 bg-green-800 text-green-100 border-2 border-green-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-500"
            />
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(34,197,94,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="relative bg-green-600 text-green-100 px-6 py-3 rounded-r-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50 overflow-hidden"
            >
              {/* Animated Glow Effect */}
              <span className="absolute inset-0 bg-green-500 opacity-30 animate-[pulse_2s_infinite]"></span>

              <span className="relative z-10">
                {isLoading ? "Generating..." : "Generate"}
                <Search className="ml-2 inline" size={20} />
              </span>
            </motion.button>
          </div>
        </form>

        {recipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center text-green-200">
              <Flame className="text-green-500 mr-2" size={32} />
              Generated Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-800/50 backdrop-blur-lg border border-green-700 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-green-200">
                      {recipe.title}
                    </h3>
                    <div className="text-sm text-green-300 mb-2">
                      <p>
                        <Cookie
                          className="inline mr-2 text-green-500"
                          size={16}
                        />
                        Uses:{" "}
                        {recipe.usedIngredients
                          .map((ing) => ing.name)
                          .join(", ")}
                      </p>
                      <p>
                        <Cookie
                          className="inline mr-2 text-green-600"
                          size={16}
                        />
                        Missing:{" "}
                        {recipe.missedIngredients
                          .map((ing) => ing.name)
                          .join(", ")}
                      </p>
                    </div>
                    <Link href={`/recipe/${recipe.id}`}>
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 15px rgba(34,197,94,0.5)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading}
                        className="relative bg-green-600 text-green-100 px-6 py-3 rounded-r-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50 overflow-hidden"
                      >
                        {/* Animated Glow Effect */}
                        <span className="absolute inset-0 bg-green-500 opacity-30 animate-[pulse_2s_infinite]"></span>

                        <span className="relative z-10">
                          View recipe detials
                          <Search className="ml-2 inline" size={20} />
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
