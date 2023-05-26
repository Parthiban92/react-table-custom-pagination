const path = require('path')

module.exports = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}