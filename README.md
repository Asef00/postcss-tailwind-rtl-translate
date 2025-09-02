# postcss-tailwind-rtl-translate

[PostCSS] plugin To flip tailwind translate styles in RTL direction.

[PostCSS]: https://github.com/postcss/postcss

```css
.-translate-x-1\/2 {
  --tw-translate-x: -50%;
}
```

```css
[dir="rtl"] .-translate-x-1\/2 {
  --tw-translate-x: calc(-50% * -1);
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-tailwind-rtl-translate
```

**Step 2:** Check your project for existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-rtlcss': {},
+   'postcss-tailwind-rtl-translate': {},
  },
};
```

[official docs]: https://github.com/postcss/postcss#usage
