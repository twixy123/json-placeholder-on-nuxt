export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en-US'
    },
    title: '',
    titleTemplate: '%s | JSONPlaceholder App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'JSONPlaceholder App' },
      { hid: 'og:url', property: 'og:url', content: 'http://localhost:3000' },
      { hid: 'og:description', property: 'og:description', content: 'JSONPlaceholder Simple Application' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', as: 'font', href: '/fonts/inter/Inter-Bold.woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/manrope/Manrope-Bold.woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/manrope/Manrope-SemiBold.woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/manrope/Manrope-Medium.woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/manrope/Manrope-Regular.woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/manrope/Manrope-Light.woff2', crossorigin: 'anonymous' }
    ]
  },

  css: [
    '~assets/scss/main.scss'
  ],
  styleResources: {
    scss: [
      '~assets/scss/variables.scss',
      '~assets/scss/mixins/grid.scss'
    ]
  },

  plugins: [
    '~/plugins/lodash.js',
    { src: '~/plugins/axios' },
    { src: '~/plugins/vue-textarea-autosize', mode: 'client' },
    { src: '~plugins/vs-pagination', mode: 'client' }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  axios: {
    baseURL: 'http://localhost:3001',
    progress: false
  },

  router: {
    scrollBehavior () {
      return { x: 0, y: 0 }
    }
  }
}
