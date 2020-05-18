const purgecss = require('@fullhuman/postcss-purgecss');

const purgecssConfig = {
  content: ['./src/index.html', './src/**/*.svelte'],
  whitelistPatterns: [/svelte-/],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
};

const plugins =
  process.env.NODE_ENV === 'production'
    ? ['tailwindcss', 'autoprefixer', purgecss(purgecssConfig)]
    : ['tailwindcss'];

module.exports = { plugins };
