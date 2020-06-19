import colors from 'vuetify/es5/util/colors'
import bodyParser from 'body-parser'
var session = require('express-session');
var PostgreSqlStore = require('connect-pg-simple')(session);

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://nuxt-socket-io.netlify.app/
    'nuxt-socket-io'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** IO module configuation
  ** See https://github.com/richardeschloss/nuxt-socket-io
  */
  io: {
    warnings: false,
    // module options
    sockets: [{
      name: 'default',
      url: 'http://0.0.0.0:' + process.env.NUXT_PORT,
      default: true,
    }]
  },
  /*
  ** Server Middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'keyboard cat',
      cookie: { maxAge: 3600000 }, // 1 hour
      resave: false, // does not forces the session to be saves back to the session store (we are using a store)
      saveUninitialized: false, // does not store cookies session when first connecting
      store: new PostgreSqlStore({ conString: process.env.DATABASE_URL }) // setting a store, the psql db needs to have a well formatted session table
    }),
    // Api middleware
    // Api is used to implement new Post / Get routes to communicate with the database
    '~/api'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
