// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      link:[
        {rel: 'preconnect', href:'https://fonts.googleapis.com'},
        {rel: 'preconnect', href:'https://fonts.gstatic.com', crossorigin: ''},
        {rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600&display=swap', crossorigin: ''}
      ]
    }
  },
  css: ['~/public/css/main.css'],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr:false,
})