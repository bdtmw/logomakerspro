// Next.js default PostCSS setup, plus PurgeCSS in production builds.
// The theme stylesheet ships styles for dozens of demo pages; PurgeCSS keeps only selectors whose class,
// id or tag names appear in src/. If you add theme markup that only exists in the original theme files,
// make sure its class names appear in src/ (or add them to the safelist below).
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: { flexbox: 'no-2009' },
        stage: 3,
        features: { 'custom-properties': false },
      },
    ],
    ...(isProd
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: ['./src/**/*.{js,jsx}'],
              defaultExtractor: (content) => content.match(/[A-Za-z0-9_-]+/g) || [],
              safelist: {
                standard: ['html', 'body', ':root', 'pin-spacer'],
                // classes added at runtime by Swiper and by state templates in the code
                greedy: [/swiper/, /^form-status/],
              },
              keyframes: false,
              fontFace: false,
              variables: false,
            },
          ],
        ]
      : []),
  ],
};
