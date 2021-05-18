require('dotenv').config({ path: `./env/.env.${process.env.NEXT_PUBLIC_APP_ENV}` })
const webpack = require('webpack')

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
}