const OfflinePlugin = require('offline-plugin');
const webpack = require(`webpack`);

// Default offline options
const defaults = {
    safeToUseOptionalCaches: true,

    externals: [
      '/'
    ],

    AppCache: {
      events: true
    },

    caches: {
      main: [
        '/',
        'index.html',
        'appendix-a/index.html',
        'sentencing-calculator/index.html',
        "component---src-pages-appendix-a-js-fb1663e75ebf2ce2896a.js",
        "component---src-pages-sentencing-calculator-js-7c3bacb3793c447715e7.js",
        "component---src-pages-index-js-d43177ee586eef7bc46c.js",
        "path---appendix-a-a0e39f21c11f6a62c5ab.js",
        "path---index-a0e39f21c11f6a62c5ab.js",
        "path---sentencing-calculator-a0e39f21c11f6a62c5ab.js",
        "commons-d61aeb2d18751dffae62.js",
        "app-fa66d8a78fe361a18e0c.js",
        "app-761b1e9d0d63682840e9.js",
        "app-5169311c4ef2080d38ef.js",
        "app-be1af9f91b12d4d7a862.js",
        "styles.css",
      ],
      additional: [
        '**/*.js',
        '*.png',
        "static/*.*"
      ],
      optional: [
        ':rest:'
      ]
    },
    

    ServiceWorker: null
  };

  //exports.onPostBuild = (args, pluginOptions) => {
    //new OfflinePlugin(defaults)
  //}

exports.modifyWebpackConfig = ({ config, stage }) => {
   
    //config.plugin(`offline`, new OfflinePlugin(defaults));
    //config.plugin()
    //console.log(config._config.plugins);
    //return config;
    
        let offline = new OfflinePlugin(defaults);
        offline.__tests.ignoreRuntime = true;
        config._config.plugins.push(offline);
    
    
}
