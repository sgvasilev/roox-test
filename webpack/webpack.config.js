const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common.js")

//when function we can access to env var
module.exports = (envVars) => {
  const { env } = envVars
  const envConfig = require(`./webpack.${env}.js`)
  const config = merge(commonConfig, envConfig)
  return config
}
