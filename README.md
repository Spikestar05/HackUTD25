# Toyota Dream Car Finder: BYR
A web solution that helps users easily search, compare, and find their dream Toyota vehicles based on personal preferences such as model, price range, financing options, fuel efficiency, and many more.

# Project Overview
Toyota is a global leader in manufacturing top-quality, fuel-efficient, and best-selling vehicles. This project aims to enhance the online car shopping experience by allowing users to:

🔍 Search Toyota vehicles by model, price, and category

⚖️ Compare multiple vehicles side by side

💰 Explore finance and lease options

# Inspiration
We wanted to transform the ordinary car-buying experience into something fun, interactive, and personal. Instead of clicking through endless spec sheets, we envisioned a website where customers can build their dream car piece by piece, just like building a bear, but for cars! The goal was to make customization intuitive, visual, and exciting.

# What it does
Build Your Ride (BYR) turns car customization into an interactive 3D experience. When users open the site, they see a base Toyota model. By clicking on different car parts such as the wheels, headlights, or engine, they can browse a carousel of available options. Each choice updates the 3D model in real time with smooth animations. For example, selecting the engine makes it hover out of the hood, letting users explore and compare designs. After customization, BYR analyzes the user’s chosen configuration and recommends the real Toyota model that most closely matches their build, including detailed specs.

# How we built it
We built BYR using Nuxt.js as our full-stack framework, which allowed us to handle both frontend and backend logic seamlessly. The 3D car models and animations were created in Blender and rendered on the web using TresJS, a Vue-based 3D library. We stored our car configuration and specification data in MongoDB, with Mongoose as the Object Data Modeling layer. For design and prototyping, we used Figma to create the user flow and visual layout before integrating it into the final product.

# Challenges we ran into
The biggest challenge was narrowing down a single idea that balanced creativity and technical depth. Once we settled on BYR, building and managing datasets for car parts and specs became difficult since no complete dataset was available. We also faced performance and optimization challenges while rendering high-quality 3D models in the browser.

# Accomplishments that we're proud of
Designed and implemented a 3D interactive car customization experience.

Created custom 3D car parts in Blender and integrated them into a Nuxt.js web app.

Built a recommendation system that matches dream builds to real car models.

Developed a cohesive user interface that feels both professional and fun.


# Future Enhancements
Integration with Toyota’s official APIs for real-time data

Personalized recommendations using AI/ML

Virtual car showroom with AR/3D previews

Dealer locator and booking test drives

# What we learned
We learned how to connect creativity and technology through 3D visualization, full-stack development, and user experience design. Our team gained valuable experience with 3D modeling in Blender, rendering with TresJS, and full-stack integration using Nuxt.js and MongoDB. Most importantly, we learned how thoughtful design can turn a standard process into something engaging and memorable.




# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
