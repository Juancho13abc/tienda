<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/4a724318-7540-4ae7-92dd-db29acf14b4f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This repo includes an automatic deploy workflow in `.github/workflows/deploy-pages.yml`.

1. Push your code to the `main` branch.
2. In GitHub, go to `Settings > Pages`.
3. Set `Source` to `GitHub Actions`.
4. Wait for the workflow `Deploy Angular to GitHub Pages` to finish.
5. Your site will be available at:
   `https://<your-username>.github.io/<your-repository-name>/`

Notes:
- The workflow builds the app and publishes `dist/app/browser`.
- A `404.html` fallback is generated automatically for client-side routes.
