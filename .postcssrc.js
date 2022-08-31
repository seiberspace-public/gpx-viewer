/* eslint-disable */
// https://github.com/michael-ciniawsky/postcss-load-config
const postcss = require('postcss');

// Get rid of a warning that originates in quasar.
const postcssNoWarn = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-no-warn-quasar',
    OnceExit(root, { result }) {
			result.messages = result.messages.filter(msg => !msg.text.startsWith('Replace color-adjust to print-color-adjust.'));
    }
  }
}
postcssNoWarn.postcss = true

module.exports = {
  plugins: [
    // to edit target browsers: use "browserslist" field in package.json
    require('autoprefixer'),
    postcssNoWarn,
  ]
}
