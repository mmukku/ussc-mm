exports.modifyWebpackConfig = ({ config, stage }) => {
    if (stage === 'build-html') {
      config.loader('null', {
        test: /uswds/,
        loader: 'null-loader'
      })
    }
  }