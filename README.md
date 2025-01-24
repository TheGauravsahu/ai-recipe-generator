# 🍽️ AI Recipe Generator

Welcome to the **AI Recipe Generator** project! This is a [Next.js](https://nextjs.org) application bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🧑‍🍳 AI Recipe Generator

This project includes an AI-powered recipe generator that suggests recipes based on the ingredients you have.

### 📝 How to Use

1. **Enter Ingredients**: Input the ingredients you have at home in the input field (comma-separated).
2. **Generate Recipes**: Click the "Generate" button.
3. **View Results**: The application will fetch and display recipes that can be made with the provided ingredients.

### 📡 API Endpoints

- **POST `/api/recipes`**: Accepts a list of ingredients and returns a list of recipes.
- **GET `/api/recipes/:recipeId`**: Fetches detailed information about a specific recipe.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Happy cooking! 🍳
